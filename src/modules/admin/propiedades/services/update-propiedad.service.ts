import { createClient } from "../../utils/supabase/client";
import { UpdatePropiedad } from "../types/update-propiedad.types";

export const updatePropiedad = async (updatePropiedad: UpdatePropiedad): Promise<void> => {
	const supabase = createClient();

	console.log("Update propiedad:", updatePropiedad);
	const { id, ...fieldsToUpdate } = updatePropiedad;

	delete fieldsToUpdate.imagenes;

	// const { id, imagenes, ...fieldsToUpdate } = updatePropiedad;

	// const imagesSinUrls = imagenes?.map((image) => {
	// 	return {
	// 		principal: image.principal,
	// 	};
	// });

	// console.log("imagesSinUrls", { id, ...fieldsToUpdate, imagenes: imagesSinUrls });

	console.log("fieldsToUpdate", { id, ...fieldsToUpdate });
	// const { data, error } = await supabase.functions.invoke("update-propiedad", {
	// 	method: "PATCH",
	// 	body: { id, ...fieldsToUpdate },
	// });

	// if (error || !data) throw new Error(error?.message || "Error al actualizar la propiedad");
};
