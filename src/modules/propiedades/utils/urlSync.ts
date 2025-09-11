import { FilterProps } from "@/modules/propiedades/types/filters.type";
import { LIMITS } from "@/modules/propiedades/constants/filters.constants";
// Helpers para leer parámetros de la URL
export const getStringParam = (searchParams: URLSearchParams, key: string): string | undefined => {
	const value = searchParams.get(key);
	return value || undefined;
};

export const getNumberParam = (searchParams: URLSearchParams, key: string): number | undefined => {
	const value = searchParams.get(key);
	return value ? parseInt(value) : undefined;
};

export const getArrayParam = (searchParams: URLSearchParams, key: string): string[] | undefined => {
	const value = searchParams.get(key);
	return value ? value.split(",") : undefined;
};

// Función para leer todos los filtros de la URL
export const parseFiltersFromURL = (searchParams: URLSearchParams): Partial<FilterProps> => {
	const urlFilters: Partial<FilterProps> = {};

	// Parámetros simples
	const tipoPropiedad = getStringParam(searchParams, "tipoPropiedad");
	if (tipoPropiedad) urlFilters.tipoPropiedad = tipoPropiedad;

	const ubicacion = getStringParam(searchParams, "ubicacion");
	if (ubicacion) urlFilters.ubicacion = ubicacion;

	// Parámetros numéricos
	const dormitorios = getNumberParam(searchParams, "dormitorios");
	if (dormitorios) urlFilters.dormitorios = dormitorios;

	const banos = getNumberParam(searchParams, "banos");
	if (banos) urlFilters.banos = banos;

	const ambientesContador = getNumberParam(searchParams, "ambientesContador");
	if (ambientesContador) urlFilters.ambientesContador = ambientesContador;

	const niveles = getNumberParam(searchParams, "niveles");
	if (niveles) urlFilters.niveles = niveles;

	// Rango de precios
	const precioMin = getNumberParam(searchParams, "precioMin");
	const precioMax = getNumberParam(searchParams, "precioMax");
	if (precioMin !== undefined || precioMax !== undefined) {
		urlFilters.precio = [precioMin ?? LIMITS.MIN_PRECIO, precioMax ?? LIMITS.MAX_PRECIO];
	}

	// Arrays
	const caracteristicas = getArrayParam(searchParams, "caracteristicas");
	if (caracteristicas) urlFilters.caracteristicas = caracteristicas;

	const ambientes = getArrayParam(searchParams, "ambientes");
	if (ambientes) urlFilters.ambientes = ambientes;

	const servicios = getArrayParam(searchParams, "servicios");
	if (servicios) urlFilters.servicios = servicios;

	// Superficie
	const superficieMin = getStringParam(searchParams, "superficieMin");
	if (superficieMin) urlFilters.superficieMin = superficieMin;

	const superficieMax = getStringParam(searchParams, "superficieMax");
	if (superficieMax) urlFilters.superficieMax = superficieMax;

	return urlFilters;
};

// Helpers para construir parámetros de URL
const addParam = (
	params: URLSearchParams,
	key: string,
	value: string | number | undefined | null,
) => {
	if (value !== undefined && value !== null && value !== "" && value !== 0) {
		params.set(key, value.toString());
	}
};

const addArrayParam = (params: URLSearchParams, key: string, array: string[]) => {
	if (array.length > 0) {
		params.set(key, array.join(","));
	}
};

const addPriceRange = (params: URLSearchParams, min: number, max: number) => {
	if (min > LIMITS.MIN_PRECIO || max < LIMITS.MAX_PRECIO) {
		params.set("precioMin", min.toString());
		params.set("precioMax", max.toString());
	}
};

// Función principal para construir URL con filtros
export const buildFilterURL = (filters: FilterProps, pathname: string): string => {
	const params = new URLSearchParams();

	addParam(params, "tipoPropiedad", filters.tipoPropiedad);
	addParam(params, "ubicacion", filters.ubicacion);
	addParam(params, "dormitorios", filters.dormitorios);
	addParam(params, "banos", filters.banos);
	addParam(params, "ambientesContador", filters.ambientesContador);
	addParam(params, "niveles", filters.niveles);
	addParam(params, "superficieMin", filters.superficieMin);
	addParam(params, "superficieMax", filters.superficieMax);

	addPriceRange(params, filters.precio[0], filters.precio[1]);

	addArrayParam(params, "caracteristicas", filters.caracteristicas);
	addArrayParam(params, "ambientes", filters.ambientes);
	addArrayParam(params, "servicios", filters.servicios);

	return params.toString() ? `${pathname}?${params.toString()}` : pathname;
};
