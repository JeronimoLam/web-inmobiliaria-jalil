import { supabase } from "@/lib/supabaseClient";
import { LIMITS } from "../../filters/constants/filters.constants";
import { type PropiedadFilters } from "../../filters/types/filters.type";
import { type Propiedad } from "../types/propiedad.type";
import {
	type PaginatedResponse,
	type PaginationParams,
} from "@/modules/pagination/types/pagination.type";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/modules/pagination/constants/pagination.constants";
import { createPaginationResponse } from "@/modules/pagination/utils/createPaginationResponse";
import { createRangePagination } from "@/modules/pagination/utils/createRangePagination";

export const getPropiedadesFiltred = async (
	tableName: string,
	filters: PropiedadFilters,
	pagination?: PaginationParams,
): Promise<PaginatedResponse<Propiedad>> => {
	const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = pagination || {};

	let from = 0;
	let to = -1; // -1 = hasta el final

	if (pagination) {
		const range = createRangePagination({ page, limit });
		from = range.from;
		to = range.to;
	}

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

	if (pagination) {
		filterBuilder.range(from, to);
	}

	const { data, error, count } = await filterBuilder;

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
