import {
	Ambiente,
	Caracteristica,
	Localidad,
	Servicio,
	TipoPropiedad,
} from "@/modules/filters/types/filters.type";
import { supabase } from "@/lib/supabaseClient";

export class FiltersApiService {
	static getCaracteristicas = async (): Promise<Caracteristica[]> => {
		const { data, error } = await supabase.from("caracteristicas").select();
		if (error) {
			console.error("Error fetching caracteristicas:", error);
			return [];
		}
		return data as Caracteristica[];
	};

	static getAmbientes = async (): Promise<Ambiente[]> => {
		const { data, error } = await supabase.from("ambientes").select();
		if (error) {
			console.error("Error fetching ambientes:", error);
			return [];
		}
		return data as Ambiente[];
	};

	static getServicios = async (): Promise<Servicio[]> => {
		const { data, error } = await supabase.from("servicios").select();
		if (error) {
			console.error("Error fetching servicios:", error);
			return [];
		}
		return data as Servicio[];
	};

	static getTiposPropiedad = async (): Promise<TipoPropiedad[]> => {
		const { data, error } = await supabase.from("tipos_propiedades").select();
		if (error) {
			console.error("Error fetching tipos de propiedad:", error);
			return [];
		}
		return data as TipoPropiedad[];
	};

	static getLocalidades = async (): Promise<Localidad[]> => {
		const { data, error } = await supabase.from("localidades").select();
		if (error) {
			console.error("Error fetching localidades:", error);
			return [];
		}
		return data as Localidad[];
	};
}
