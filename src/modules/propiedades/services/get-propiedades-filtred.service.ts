import { supabase } from "@/lib/supabaseClient";
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

	if (filters.divisa && (filters.precioMin || filters.precioMax)) {
		filterBuilder.filter("precios", "cs", JSON.stringify([{ divisa: filters.divisa }]));
	}

	if (filters.superficieMin) {
		filterBuilder.gte("detalles->>superficie_lote", filters.superficieMin);
	}
	if (filters.superficieMax) {
		filterBuilder.lte("detalles->>superficie_lote", filters.superficieMax);
	}

	/* Para filtrar por rango de precios, caracteristicas, ambientes y servicios, 
	se busca primero los IDs de las propiedades que cumplen con el filtro en memoria
	y luego se filtran esos IDs en el query principal mediante Supabase con .in() -> filtra por array de IDs */
	const filteredIds = await propiedadesInMemoryFilter(filters, tableName);

	if (filteredIds && filteredIds.length > 0) {
		filterBuilder.in("id", filteredIds);
	} else if (filteredIds && filteredIds.length === 0) {
		return {
			data: [],
			pagination: createPaginationResponse({ page, limit, from, to, totalItems: 0 }),
		};
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

	return filteredData;
};

const propiedadesInMemoryFilter = async (
	filters: PropiedadFilters,
	tableName: string,
): Promise<number[] | null> => {
	let filteredIds: number[] | null = null;

	const { data } = await supabase
		.from(tableName)
		.select("id, precios, caracteristicas, ambientes, servicios");

	if (filters.precioMin || filters.precioMax) {
		const idsP = (data ?? [])
			.filter((p: Partial<Propiedad>) => {
				const precio = p.precios?.find((pr) => pr.divisa === filters.divisa);
				return (
					precio &&
					(!filters.precioMin || precio.importe >= filters.precioMin) &&
					(!filters.precioMax || precio.importe <= filters.precioMax)
				);
			})
			.map((p) => Number(p.id));
		filteredIds = idsP;
	}

	if (filters.caracteristicas?.length) {
		const idsC = (data ?? [])
			.filter((p: Partial<Propiedad>) =>
				filters.caracteristicas!.every((c) => p.caracteristicas?.[c] === true),
			)
			.map((p) => Number(p.id));
		filteredIds = filteredIds ? filteredIds.filter((id) => idsC.includes(id)) : idsC;
	}

	if (filters.ambientes?.length) {
		const idsA = (data ?? [])
			.filter((p: Partial<Propiedad>) => filters.ambientes!.every((a) => p.ambientes?.[a] === true))
			.map((p) => Number(p.id));
		filteredIds = filteredIds ? filteredIds.filter((id) => idsA.includes(id)) : idsA;
	}

	if (filters.servicios?.length) {
		const idsS = (data ?? [])
			.filter((p: Partial<Propiedad>) => filters.servicios!.every((s) => p.servicios?.[s] === true))
			.map((p) => Number(p.id));
		filteredIds = filteredIds ? filteredIds.filter((id) => idsS.includes(id)) : idsS;
	}

	return filteredIds;
};
