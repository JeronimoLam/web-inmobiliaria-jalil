import { TipoPropiedad } from "@/modules/filters/types/filters.type";
import { createClient } from "@/modules/admin/utils/supabase/server";

export const getTipoPropiedadById = async (id: number): Promise<TipoPropiedad | null> => {
	const supabase = await createClient();

	const { data, error } = await supabase.from("tipos_propiedades").select("*").eq("id", id);

	if (error || !data) {
		return null;
	}

	return data[0];
};
