import { createClient } from "../../utils/supabase/client";
import { UpdatePropiedad } from "../types/update-propiedad.types";

export const updatePropiedad = async (updatePropiedad: UpdatePropiedad): Promise<void> => {
	const supabase = createClient();

	const { data, error } = await supabase.functions.invoke("update-propiedad", {
		body: updatePropiedad,
	});

	if (error || !data) throw new Error(error?.message || "Error al actualizar la propiedad");

	console.log({ data, error });
};
