import { useEffect, Dispatch, SetStateAction } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PropiedadFilters } from "@/modules/propiedades/types/filters.type";
import { parseFiltersFromURL, buildFilterURL } from "@/modules/propiedades/utils/urlSync";

interface UseURLSyncProps {
	setFilters: Dispatch<SetStateAction<PropiedadFilters>>;
}

export const useURLSync = ({ setFilters }: UseURLSyncProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	// Sincronizar Filtros UI con URL
	useEffect(() => {
		const urlFilters = parseFiltersFromURL(searchParams, pathname);
		setFilters(urlFilters);
	}, [searchParams, pathname, setFilters]);

	// Sincronizar URL con Filtros UI
	const syncFiltersWithURL = (newFilters: PropiedadFilters) => {
		const basePath =
			newFilters.operacion === "venta" ? "/propiedades/venta" : "/propiedades/alquiler";
		const newUrl = buildFilterURL(newFilters, basePath);
		router.replace(newUrl, { scroll: false });
	};

	return {
		syncFiltersWithURL,
	};
};
