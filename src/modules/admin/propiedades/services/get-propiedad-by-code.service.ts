import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { createClient } from "../../utils/supabase/server";

export const getPropiedadByCode = async (code: string): Promise<Propiedad | null> => {
	const supabase = await createClient();

	const { data, error } = await supabase.from("propiedades_full").select("*").eq("codigo", code);

	if (error || !data) {
		return null;
	}

	return data[0];
};
