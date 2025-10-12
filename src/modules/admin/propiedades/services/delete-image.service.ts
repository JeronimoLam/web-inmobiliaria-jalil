import { createClient } from "../../utils/supabase/client";
import { IMAGE_BUCKET } from "../constants/image-bucket";

const supabase = createClient();

export const deleteImageFromSupabase = async (
	propiedadId: number,
	imageUrl: string,
): Promise<void> => {
	const fileName = imageUrl.split("/").pop();
	if (!fileName) throw new Error("No se pudo obtener el nombre del archivo de la URL");

	const filePath = `${propiedadId}/${fileName}`;

	const { error } = await supabase.storage.from(IMAGE_BUCKET).remove([filePath]);

	if (error) throw new Error(error.message);
};

export const deleteImage = async (
	propiedadId: number,
	imageId: number,
	imageUrl: string,
): Promise<void> => {
	const { error } = await supabase.from("imagenes").delete().eq("id", imageId);

	if (error) throw new Error(error.message || "Error al eliminar la imagen de la base de datos");

	await deleteImageFromSupabase(propiedadId, imageUrl);
};
