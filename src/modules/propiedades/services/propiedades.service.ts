import { OperacionesEnum } from "../enums/propiedades.enum";
import { Propiedad } from "../types/propiedad.type";
import { PropiedadFilters } from "../../filters/types/filters.type";
import { supabase } from "@/lib/supabaseClient";
import { LIMITS } from "../../filters/constants/filters.constants";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";

interface getPropiedadesParams {
	operacion?: OperacionesEnum;
	filters?: PropiedadFilters;
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
	): Promise<Propiedad[]> => {
		const filterBuilder = supabase.from(tableName).select("*");

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

		const { data, error } = await filterBuilder;

		if (error) {
			console.error("Error Supabase:", error);
			return [];
		}

		let filteredData = data ?? [];

		// Se filtra en memoria, ya que supabase no soporta filtros dinámicos en campos JSON
		// Filtros de características, ambientes y servicios (checkboxes)
		if (filters.caracteristicas && filters.caracteristicas.length > 0) {
			filteredData = filteredData.filter((propiedad: Propiedad) => {
				return filters.caracteristicas!.every(
					(caracteristica) =>
						propiedad.caracteristicas && propiedad.caracteristicas[caracteristica] === true,
				);
			});
		}

		if (filters.ambientes && filters.ambientes.length > 0) {
			filteredData = filteredData.filter((propiedad: Propiedad) => {
				return filters.ambientes!.every(
					(ambiente) => propiedad.ambientes && propiedad.ambientes[ambiente] === true,
				);
			});
		}

		if (filters.servicios && filters.servicios.length > 0) {
			filteredData = filteredData.filter((propiedad: Propiedad) => {
				return filters.servicios!.every(
					(servicio) => propiedad.servicios && propiedad.servicios[servicio] === true,
				);
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
	static getAll = async ({ operacion, filters }: getPropiedadesParams): Promise<Propiedad[]> => {
		let tableName;
		if (!operacion) {
			tableName = "propiedades_full";
		} else {
			tableName =
				operacion === OperacionesEnum.VENTA ? "propiedades_venta" : "propiedades_alquiler";
		}

		if (filters) {
			return await this.getPropiedadesFiltred(tableName, filters);
		}

		try {
			const response = await fetch(`${SUPABASE_URL}/${tableName}`, {
				headers: this.getHeaders(),
				next: { revalidate: 300 },
			});
			if (!response.ok) {
				throw new Error("Error fetching propiedades");
			}
			const data = await response.json();
			return data || [];
		} catch (error) {
			console.error(error);
			return [];
		}
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
