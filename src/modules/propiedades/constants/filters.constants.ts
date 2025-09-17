import { PropiedadFilters } from "@/modules/propiedades/types/filters.type";

export const LIMITS = {
	MAX_DORMITORIOS: 10,
	MAX_PRECIO: 1000000,
	MIN_PRECIO: 0,
	MIN_COUNTER_VALUE: 0,
} as const;

export const DEFAULT_FILTERS: PropiedadFilters = {
	tipoPropiedad: "",
	localidad: "",
	dormitorios: 0,
	precioMin: LIMITS.MIN_PRECIO,
	precioMax: LIMITS.MAX_PRECIO,
	caracteristicas: [],
	ambientes: [],
	servicios: [],
	superficieMin: 0,
	superficieMax: 0,
	banos: 0,
	ambientesContador: 0,
	pisos: 0,
};
