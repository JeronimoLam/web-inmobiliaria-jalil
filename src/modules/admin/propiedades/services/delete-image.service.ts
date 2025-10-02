import { createClient } from "../../utils/supabase/client";

export const deleteImage = async (imageId: number) => {
	const supabase = createClient();

	// Probemos si existe la imagen
	const { data: image, error: imageError } = await supabase
		.from("imagenes")
		.select("*")
		.eq("id", imageId);

	if (imageError || !image) throw new Error(imageError?.message || "Error al obtener la imagen");
	console.log("Imagen encontrada...", image);

	console.log("Eliminando imagen...", imageId);
	const { data, error } = await supabase.from("imagenes").delete().eq("id", imageId).select("*");

	if (error || !data) throw new Error(error?.message || "Error al eliminar la imagen");

	return data;
};
