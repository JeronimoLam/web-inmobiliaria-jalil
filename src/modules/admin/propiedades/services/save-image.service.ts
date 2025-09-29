import { createClient } from "../../utils/supabase/client";
import { SaveImage } from "../types/save-image";

export const saveImage = async (image: SaveImage) => {
	const supabase = createClient();

	const { data, error } = await supabase.functions.invoke("save-image", {
		body: {
			id_propiedad: image.id_propiedad,
			url: image.url,
			principal: image.principal,
		},
	});

	if (error || !data) throw new Error(error?.message || "Error al guardar la imagen");
};
