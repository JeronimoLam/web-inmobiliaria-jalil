import { createClient } from "../../utils/supabase/client";
import { UpdatePropiedad } from "../types/update-propiedad.types";

export const updatePropiedad = async (updatePropiedad: UpdatePropiedad): Promise<void> => {
	const supabase = createClient();

	const { id, ...fieldsToUpdate } = updatePropiedad;

	delete fieldsToUpdate.imagenes;

	const { data, error } = await supabase.functions.invoke("update-propiedad", {
		method: "PATCH",
		body: { id, ...fieldsToUpdate },
	});

	if (error || !data) throw new Error(error?.message || "Error al actualizar la propiedad");
};
