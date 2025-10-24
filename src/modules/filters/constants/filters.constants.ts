import { PropiedadFilters } from "@/modules/filters/types/filters.type";
import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";

export const LIMITS = {
	MAX_DORMITORIOS: 10,
	MAX_PRECIO_ARS_ALQUILER: Number(process.env.NEXT_PUBLIC_MAX_PRECIO_ARS_ALQUILER!),
	MAX_PRECIO_USD_ALQUILER: Number(process.env.NEXT_PUBLIC_MAX_PRECIO_USD_ALQUILER!),
	MAX_PRECIO_USD_VENTA: Number(process.env.NEXT_PUBLIC_MAX_PRECIO_USD_VENTA!),
	MIN_PRECIO: 0,
	MIN_COUNTER_VALUE: 0,
} as const;

export const DEFAULT_FILTERS: PropiedadFilters = {
	tipoPropiedad: undefined,
	localidad: undefined,
	dormitorios: undefined,
	precioMin: LIMITS.MIN_PRECIO,
	precioMax: LIMITS.MAX_PRECIO_ARS_ALQUILER,
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

export const getMaxPrecio = (divisa: "ARS" | "USD", operacion: OperacionesEnum): number => {
	if (operacion === OperacionesEnum.VENTA) {
		return LIMITS.MAX_PRECIO_USD_VENTA;
	}
	return divisa === "ARS" ? LIMITS.MAX_PRECIO_ARS_ALQUILER : LIMITS.MAX_PRECIO_USD_ALQUILER;
};
