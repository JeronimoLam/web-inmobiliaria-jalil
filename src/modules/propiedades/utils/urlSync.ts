import { PropiedadFilters } from "@/modules/propiedades/types/filters.type";
import { LIMITS } from "@/modules/propiedades/constants/filters.constants";

export const parseFiltersFromURL = (
	searchParams: URLSearchParams,
	pathname?: string,
): PropiedadFilters => {
	const operacionFromPath = pathname?.includes("/alquiler") ? "alquiler" : "venta";

	return {
		operacion: (searchParams.get("operacion") as "venta" | "alquiler") || operacionFromPath,
		tipoPropiedad: searchParams.get("tipoPropiedad") || "",
		localidad: searchParams.get("localidad") || "",
		dormitorios: parseInt(searchParams.get("dormitorios") || "0"),
		banos: parseInt(searchParams.get("banos") || "0"),
		ambientesContador: parseInt(searchParams.get("ambientesContador") || "0"),
		niveles: parseInt(searchParams.get("niveles") || "0"),
		precioMin: parseInt(searchParams.get("precioMin") || "0") || LIMITS.MIN_PRECIO,
		precioMax: parseInt(searchParams.get("precioMax") || "0") || LIMITS.MAX_PRECIO,
		caracteristicas: searchParams.get("caracteristicas")?.split(",") || [],
		ambientes: searchParams.get("ambientes")?.split(",") || [],
		servicios: searchParams.get("servicios")?.split(",") || [],
		superficieMin: searchParams.get("superficieMin") || "",
		superficieMax: searchParams.get("superficieMax") || "",
	};
};

export const buildFilterURL = (filters: PropiedadFilters, pathname: string): string => {
	const params = new URLSearchParams();

	// Campos simples
	if (filters.tipoPropiedad) params.set("tipoPropiedad", filters.tipoPropiedad);
	if (filters.localidad) params.set("localidad", filters.localidad);
	if (filters.dormitorios > 0) params.set("dormitorios", filters.dormitorios.toString());
	if (filters.banos > 0) params.set("banos", filters.banos.toString());
	if (filters.ambientesContador > 0)
		params.set("ambientesContador", filters.ambientesContador.toString());
	if (filters.niveles > 0) params.set("niveles", filters.niveles.toString());
	if (filters.superficieMin) params.set("superficieMin", filters.superficieMin);
	if (filters.superficieMax) params.set("superficieMax", filters.superficieMax);

	// Rango de Precio
	if (filters.precioMin > LIMITS.MIN_PRECIO || filters.precioMax < LIMITS.MAX_PRECIO) {
		params.set("precioMin", filters.precioMin.toString());
		params.set("precioMax", filters.precioMax.toString());
	}

	// Arrays
	if (filters.caracteristicas.length > 0)
		params.set("caracteristicas", filters.caracteristicas.join(","));
	if (filters.ambientes.length > 0) params.set("ambientes", filters.ambientes.join(","));
	if (filters.servicios.length > 0) params.set("servicios", filters.servicios.join(","));

	return params.toString() ? `${pathname}?${params.toString()}` : pathname;
};
