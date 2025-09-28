import { createClient } from "../../utils/supabase/client";
import { CreatePropiedad } from "../types/create-propiedad.type";

export const createPropiedad = async (newPropiedad: CreatePropiedad) => {
	const supabase = createClient();

	const response = await supabase.functions.invoke("create-propiedad", {
		body: newPropiedad,
	});

	if (response.error) {
		throw new Error(response.error.message);
	}

	return response.data;
};
