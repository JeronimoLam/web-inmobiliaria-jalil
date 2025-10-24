import { PropiedadFilters } from "@/modules/filters/types/filters.type";

export const LIMITS = {
	MAX_DORMITORIOS: 10,
	MAX_PRECIO_ARS: Number(process.env.NEXT_PUBLIC_MAX_PRECIO_ARS!),
	MAX_PRECIO_USD: Number(process.env.NEXT_PUBLIC_MAX_PRECIO_USD!),
	MIN_PRECIO: 0,
	MIN_COUNTER_VALUE: 0,
} as const;

export const DEFAULT_FILTERS: PropiedadFilters = {
	tipoPropiedad: undefined,
	localidad: undefined,
	dormitorios: undefined,
	precioMin: LIMITS.MIN_PRECIO,
	precioMax: LIMITS.MAX_PRECIO_ARS,
	caracteristicas: [],
	ambientes: [],
	servicios: [],
	superficieMin: undefined,
	superficieMax: undefined,
	divisa: "ARS",
	banos: undefined,
	ambientesContador: undefined,
	pisos: undefined,
};
