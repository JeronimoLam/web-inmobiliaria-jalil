import { Localidad } from "@/modules/filters/types/filters.type";
import { createClient } from "@/modules/admin/utils/supabase/server";

export const getLocalidadById = async (id: number): Promise<Localidad | null> => {
	const supabase = await createClient();

	const { data, error } = await supabase.from("localidades").select("*").eq("id", id);

	if (error || !data) {
		return null;
	}

	return data[0];
};
