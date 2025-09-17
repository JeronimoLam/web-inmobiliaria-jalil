import { useEffect, Dispatch, SetStateAction } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PropiedadFilters } from "@/modules/propiedades/types/filters.type";
import {
	parseFiltersFromURL,
	buildFilterURL,
	parseOperacionFromURL,
} from "@/modules/propiedades/utils/urlSync";
import { OperacionesEnum } from "../enums/propiedades.enum";

interface UseURLSyncProps {
	setFilters: Dispatch<SetStateAction<PropiedadFilters>>;
	setOperacion: Dispatch<SetStateAction<OperacionesEnum>>;
}

export const useURLSync = ({ setFilters, setOperacion }: UseURLSyncProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	// Sincronizar Filtros UI con URL
	useEffect(() => {
		const urlFilters = parseFiltersFromURL(searchParams);
		const urlOperacion = parseOperacionFromURL(pathname);

		setFilters(urlFilters);
		setOperacion(urlOperacion);
	}, [searchParams, pathname, setFilters, setOperacion]);

	// Sincronizar URL con Filtros UI
	const syncFiltersWithURL = (newFilters: PropiedadFilters, operacion: OperacionesEnum) => {
		const basePath =
			operacion === OperacionesEnum.VENTA ? "/propiedades/venta" : "/propiedades/alquiler";
		const newUrl = buildFilterURL(newFilters, basePath);
		router.replace(newUrl, { scroll: false });
	};

	return {
		syncFiltersWithURL,
	};
};
