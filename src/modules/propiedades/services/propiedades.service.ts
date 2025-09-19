import { OperacionesEnum } from "../enums/propiedades.enum";
import { Propiedad } from "../types/propiedad.type";
import { PropiedadFilters } from "../../filters/types/filters.type";
import { supabase } from "@/lib/supabaseClient";
import { LIMITS } from "../../filters/constants/filters.constants";
import {
	type PaginatedResponse,
	type PaginationParams,
} from "@/modules/pagination/types/pagination.type";
import { createPaginationResponse } from "@/modules/pagination/utils/createPaginationResponse";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/modules/pagination/constants/pagination.constants";
import { createRangePagination } from "@/modules/pagination/utils/createRangePagination";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";

interface GetPropiedadesParams {
	operacion?: OperacionesEnum;
	filters?: PropiedadFilters;
	pagination?: PaginationParams;
}

export class PropiedadesService {
	private static getHeaders() {
		return {
			Authorization: `Bearer ${SUPABASE_KEY}`,
			apikey: SUPABASE_KEY,
		};
	}

	private static getPropiedadesFiltred = async (
		tableName: string,
		filters: PropiedadFilters,
		pagination?: PaginationParams,
	): Promise<PaginatedResponse<Propiedad>> => {
		const { page, limit } = pagination || { page: DEFAULT_PAGE, limit: DEFAULT_LIMIT };
		const { from, to } = createRangePagination({ page, limit });

		const filterBuilder = supabase.from(tableName).select("*", { count: "exact" });

		if (filters.destacadas) {
			filterBuilder.eq("destacada", true);
		}

		if (filters.tipoPropiedad) {
			filterBuilder.eq("tipo_propiedad->>value", filters.tipoPropiedad);
		}
		if (filters.localidad) {
			filterBuilder.eq("localidad->>nombre", filters.localidad);
		}
		if (filters.dormitorios && filters.dormitorios > 0) {
			filterBuilder.eq("detalles->>dormitorios", filters.dormitorios);
		}
		if (filters.banos && filters.banos > 0) {
			filterBuilder.eq("detalles->>banos", filters.banos);
		}
		if (filters.ambientesContador && filters.ambientesContador > 0) {
			filterBuilder.eq("detalles->>ambientes", filters.ambientesContador);
		}
		if (filters.pisos && filters.pisos > 0) {
			filterBuilder.eq("detalles->>pisos", filters.pisos);
		}

		if (filters.precioMin && filters.precioMin > LIMITS.MIN_PRECIO) {
			filterBuilder.gte("precios->0->>importe", filters.precioMin);
		}
		if (filters.precioMax && filters.precioMax < LIMITS.MAX_PRECIO) {
			filterBuilder.lte("precios->0->>importe", filters.precioMax);
		}

		if (filters.superficieMin) {
			filterBuilder.gte("detalles->>superficie_lote", filters.superficieMin);
		}
		if (filters.superficieMax) {
			filterBuilder.lte("detalles->>superficie_lote", filters.superficieMax);
		}

		const { data, error, count } = await filterBuilder.range(from, to);

		const paginationResponse = createPaginationResponse({
			page,
			limit,
			from,
			to,
			totalItems: count || 0,
		});
		// count es la
		if (error) {
			console.error("Error Supabase:", error);
			return {
				data: [],
				pagination: paginationResponse,
			};
		}

		const filteredData = {
			data: data || [],
			pagination: paginationResponse,
		};

		// Se filtra en memoria, ya que supabase no soporta filtros dinámicos en campos JSON
		// Filtros de características, ambientes y servicios (checkboxes)
		if (filters.caracteristicas && filters.caracteristicas.length > 0) {
			filteredData.data = filteredData.data.filter((propiedad: Propiedad) => {
				return filters.caracteristicas!.every(
					(caracteristica) =>
						propiedad.caracteristicas && propiedad.caracteristicas[caracteristica] === true,
				);
			});
		}

		if (filters.ambientes && filters.ambientes.length > 0) {
			filteredData.data = filteredData.data.filter((propiedad: Propiedad) => {
				return filters.ambientes!.every(
					(ambiente) => propiedad.ambientes && propiedad.ambientes[ambiente] === true,
				);
			});
		}

		if (filters.servicios && filters.servicios.length > 0) {
			filteredData.data = filteredData.data.filter((propiedad: Propiedad) => {
				return filters.servicios!.every(
					(servicio) => propiedad.servicios && propiedad.servicios[servicio] === true,
				);
			});
		}

		// Si hubo filtros en memoria, recalcular paginación
		if (
			(filters.caracteristicas && filters.caracteristicas.length > 0) ||
			(filters.ambientes && filters.ambientes.length > 0) ||
			(filters.servicios && filters.servicios.length > 0)
		) {
			const totalItems = filteredData.data.length;
			filteredData.pagination = createPaginationResponse({
				page,
				limit,
				from,
				to,
				totalItems,
			});
		}

		return filteredData;
	};

	/**
	 * Obtiene una lista de propiedades, permitiendo filtrar por tipo de operación y otros criterios.
	 * @param operacion Tipo de operación: "venta" o "alquiler". Si no se especifica, devuelve todas.
	 * @param filters Filtros opcionales para refinar la búsqueda (tipo, localidad, precio, etc).
	 * @returns Un array de propiedades que cumplen con los filtros, o vacío si ocurre un error.
	 */
	static getAll = async ({
		operacion,
		filters,
		pagination,
	}: GetPropiedadesParams): Promise<PaginatedResponse<Propiedad>> => {
		const { page, limit } = pagination || { page: DEFAULT_PAGE, limit: DEFAULT_LIMIT };
		const { from, to } = createRangePagination({ page, limit });

		let tableName;

		if (!operacion) {
			tableName = "propiedades_full";
		} else {
			tableName =
				operacion === OperacionesEnum.VENTA ? "propiedades_venta" : "propiedades_alquiler";
		}

		if (filters) {
			return await this.getPropiedadesFiltred(tableName, filters, {
				page,
				limit,
			});
		}

		const { data, error, count } = await supabase
			.from(tableName)
			.select("*", { count: "exact" })
			.range(from, to);

		console.log("Total de propiedades:", count);

		const paginationResponse = createPaginationResponse({
			page,
			limit,
			from,
			to,
			totalItems: count || 0,
		});

		if (error) {
			console.error("Error Supabase:", error);
			return {
				data: [],
				pagination: paginationResponse,
			};
		}

		return {
			data: data || [],
			pagination: paginationResponse,
		};
	};

	static getPropiedad = async (
		codigo: number,
		operacion: OperacionesEnum,
	): Promise<Propiedad | null> => {
		try {
			let response;
			if (operacion === OperacionesEnum.ALQUILER) {
				response = await fetch(`${SUPABASE_URL}/rest/v1/propiedades_alquiler?codigo=eq.${codigo}`, {
					headers: this.getHeaders(),
					cache: "no-store",
				});
			} else {
				response = await fetch(`${SUPABASE_URL}/rest/v1/propiedades_venta?codigo=eq.${codigo}`, {
					headers: this.getHeaders(),
					cache: "no-store",
				});
			}
			console.log(response);
			if (!response.ok) {
				throw new Error("Error fetching propiedad");
			}

			const data = await response.json();

			const propiedad = Array.isArray(data) ? data[0] : data;

			return propiedad || null;
		} catch (error) {
			console.log(error);
			return null;
		}
	};
}
