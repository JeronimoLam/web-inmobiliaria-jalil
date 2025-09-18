import { PropiedadFilters } from "@/modules/filters/types/filters.type";

export const LIMITS = {
	MAX_DORMITORIOS: 10,
	MAX_PRECIO: 1000000,
	MIN_PRECIO: 0,
	MIN_COUNTER_VALUE: 0,
} as const;

export const DEFAULT_FILTERS: PropiedadFilters = {
	tipoPropiedad: undefined,
	localidad: undefined,
	dormitorios: undefined,
	precioMin: LIMITS.MIN_PRECIO,
	precioMax: LIMITS.MAX_PRECIO,
	caracteristicas: [],
	ambientes: [],
	servicios: [],
	superficieMin: undefined,
	superficieMax: undefined,
	banos: undefined,
	ambientesContador: undefined,
	pisos: undefined,
};
