import { FiltersApiService } from "@/modules/filters/services/filtersApi.service";
import { useEffect, useState } from "react";
import { TipoPropiedad } from "@/modules/filters/types/filters.type";
import { Localidad } from "@/modules/filters/types/filters.type";
import { toast } from "sonner";

export const useGetInitDataForm = () => {
	const [tiposPropiedad, setTiposPropiedad] = useState<TipoPropiedad[]>([]);
	const [localidades, setLocalidades] = useState<Localidad[]>([]);

	useEffect(() => {
		const loadData = async () => {
			try {
				const [tipos, localidades] = await Promise.all([
					FiltersApiService.getTiposPropiedad(),
					FiltersApiService.getLocalidades(),
				]);
				setTiposPropiedad(tipos);
				setLocalidades(localidades);
			} catch (error) {
				console.error("Error cargando datos:", error);
				toast.error("Error al cargar los datos iniciales");
			}
		};

		loadData();
	}, []);

	return { tiposPropiedad, localidades };
};
