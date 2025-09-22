import { supabase } from "@/lib/supabaseClient";
import { getPropiedadesFiltred } from "./get-propiedades-filtred.service";
import { OperacionesEnum } from "../enums/propiedades.enum";
import { type Propiedad } from "../types/propiedad.type";
import { type PropiedadFilters } from "../../filters/types/filters.type";
import {
	type PaginatedResponse,
	type PaginationParams,
} from "@/modules/pagination/types/pagination.type";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/modules/pagination/constants/pagination.constants";
import { createPaginationResponse } from "@/modules/pagination/utils/createPaginationResponse";
import { createRangePagination } from "@/modules/pagination/utils/createRangePagination";

export interface GetPropiedadesParams {
	operacion?: OperacionesEnum;
	filters?: PropiedadFilters;
	pagination?: PaginationParams;
}

/**
 * Obtiene una lista de propiedades desde la base de datos de Supabase.
 *
 * Permite filtrar por tipo de operación (venta, alquiler o todas), aplicar filtros específicos
 * y manejar la paginación de resultados.
 *
 * @param {GetPropiedadesParams} params - Parámetros de búsqueda.
 * @param {OperacionesEnum} [params.operacion] - Tipo de operación. Si no se especifica, devuelve todas.
 * @param {PropiedadFilters} [params.filters] - Filtros opcionales para refinar la búsqueda (ej: tipo, localidad, precio, etc).
 * @param {PaginationParams} [params.pagination] - Parámetros de paginación (página y límite). Por defecto: página 1, límite 5.
 * @returns {Promise<PaginatedResponse<Propiedad>>} Respuesta con el listado de propiedades y metadatos de paginación.
 */
export const getPropiedades = async ({
	operacion,
	filters,
	pagination = { page: DEFAULT_PAGE, limit: DEFAULT_LIMIT },
}: GetPropiedadesParams): Promise<PaginatedResponse<Propiedad>> => {
	// const { from, to } = createRangePagination(pagination);

	let tableName;

	if (!operacion) {
		tableName = "propiedades_full";
	} else {
		tableName = operacion === OperacionesEnum.VENTA ? "propiedades_venta" : "propiedades_alquiler";
	}

	if (filters) {
		return await getPropiedadesFiltred(tableName, filters, pagination);
	}

	let propiedades = supabase.from(tableName).select("*", { count: "exact" });
	let from = 0;
	let to = -1; // -1 = hasta el final

	if (pagination) {
		const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = pagination;
		const range = createRangePagination({ page, limit });
		from = range.from;
		to = range.to;
		propiedades = propiedades.range(from, to);
	}

	const { data, error, count } = await propiedades;

	if (error) {
		console.error("Error Supabase:", error);
		return {
			data: [],
			pagination: createPaginationResponse({
				page: pagination?.page ?? 1,
				limit: pagination?.limit ?? (count || 0),
				from,
				to,
				totalItems: count || 0,
			}),
		};
	}

	const paginationResponse = createPaginationResponse({
		page: pagination.page,
		limit: pagination.limit,
		from,
		to,
		totalItems: count || 0,
	});

	return {
		data: data || [],
		pagination: paginationResponse,
	};
};
