import { PropiedadFilters } from "@/modules/filters/types/filters.type";
import { LIMITS } from "@/modules/filters/constants/filters.constants";
import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";

export const parseOperacionFromURL = (pathname: string): OperacionesEnum => {
	if (pathname.includes("/venta")) {
		return OperacionesEnum.VENTA;
	}
	return OperacionesEnum.ALQUILER;
};

export const parseFiltersFromURL = (searchParams: URLSearchParams): PropiedadFilters => {
	return {
		tipoPropiedad: searchParams.get("tipoPropiedad") || undefined,
		localidad: searchParams.get("localidad") || undefined,
		dormitorios: searchParams.get("dormitorios")
			? parseInt(searchParams.get("dormitorios")!)
			: undefined,
		banos: searchParams.get("banos") ? parseInt(searchParams.get("banos")!) : undefined,
		ambientesContador: searchParams.get("ambientesContador")
			? parseInt(searchParams.get("ambientesContador")!)
			: undefined,
		pisos: searchParams.get("pisos") ? parseInt(searchParams.get("pisos")!) : undefined,
		precioMin: searchParams.get("precioMin") ? parseInt(searchParams.get("precioMin")!) : undefined,
		precioMax: searchParams.get("precioMax") ? parseInt(searchParams.get("precioMax")!) : undefined,
		caracteristicas: searchParams.get("caracteristicas")?.split(",").filter(Boolean) || undefined,
		ambientes: searchParams.get("ambientes")?.split(",").filter(Boolean) || undefined,
		servicios: searchParams.get("servicios")?.split(",").filter(Boolean) || undefined,
		superficieMin: searchParams.get("superficieMin")
			? parseInt(searchParams.get("superficieMin")!)
			: undefined,
		superficieMax: searchParams.get("superficieMax")
			? parseInt(searchParams.get("superficieMax")!)
			: undefined,
	};
};

export const buildFilterURL = (filters: PropiedadFilters, pathname: string): string => {
	const params = new URLSearchParams();

	// Campos simples
	if (filters.tipoPropiedad) params.set("tipoPropiedad", filters.tipoPropiedad);
	if (filters.localidad) params.set("localidad", filters.localidad);
	if (filters.dormitorios && filters.dormitorios > 0)
		params.set("dormitorios", filters.dormitorios.toString());
	if (filters.banos && filters.banos > 0) params.set("banos", filters.banos.toString());
	if (filters.ambientesContador && filters.ambientesContador > 0)
		params.set("ambientesContador", filters.ambientesContador.toString());
	if (filters.pisos && filters.pisos > 0) params.set("pisos", filters.pisos.toString());
	if (filters.superficieMin && filters.superficieMin > 0)
		params.set("superficieMin", filters.superficieMin.toString());
	if (filters.superficieMax && filters.superficieMax > 0)
		params.set("superficieMax", filters.superficieMax.toString());

	// Rango de Precio
	if (
		(filters.precioMin && filters.precioMin > LIMITS.MIN_PRECIO) ||
		(filters.precioMax && filters.precioMax < LIMITS.MAX_PRECIO)
	) {
		if (filters.precioMin) params.set("precioMin", filters.precioMin.toString());
		if (filters.precioMax) params.set("precioMax", filters.precioMax.toString());
	}

	// Arrays
	if (filters.caracteristicas && filters.caracteristicas.length > 0)
		params.set("caracteristicas", filters.caracteristicas.join(","));
	if (filters.ambientes && filters.ambientes.length > 0)
		params.set("ambientes", filters.ambientes.join(","));
	if (filters.servicios && filters.servicios.length > 0)
		params.set("servicios", filters.servicios.join(","));

	return params.toString() ? `${pathname}?${params.toString()}` : pathname;
};
