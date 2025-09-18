import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface UsePropertySearchSyncReturn {
	initialTipoPropiedad: string;
	initialLocalidad: string;
	handleSearchFormSubmit: (params: { tipoPropiedad: string; localidad: string }) => void;
}

/**
 * Hook personalizado para sincronizar el formulario de búsqueda de propiedades con la URL.
 * Maneja la lectura de valores iniciales desde la URL y la actualización de parámetros
 * preservando los filtros existentes
 */
export const usePropertySearchSync = (): UsePropertySearchSyncReturn => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const initialTipoPropiedad = searchParams.get("tipoPropiedad") || "";
	const initialLocalidad = searchParams.get("localidad") || "";

	const handleSearchFormSubmit = ({
		tipoPropiedad,
		localidad,
	}: {
		tipoPropiedad: string;
		localidad: string;
	}) => {
		const currentParams = new URLSearchParams(searchParams.toString());

		if (tipoPropiedad) {
			currentParams.set("tipoPropiedad", tipoPropiedad);
		} else {
			currentParams.delete("tipoPropiedad");
		}

		if (localidad) {
			currentParams.set("localidad", localidad);
		} else {
			currentParams.delete("localidad");
		}

		const newUrl = `${pathname}?${currentParams.toString()}`;
		router.push(newUrl);
	};

	return {
		initialTipoPropiedad,
		initialLocalidad,
		handleSearchFormSubmit,
	};
};
