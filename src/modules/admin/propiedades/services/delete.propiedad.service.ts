import { createClient } from "../../utils/supabase/client";
import { IMAGE_BUCKET } from "../constants/image-bucket";

const supabase = createClient();
export const deletePropiedad = async (id: number) => {
	const { data, error } = await supabase.functions.invoke(`delete-propiedad?id=${id}`, {
		method: "DELETE",
	});

	if (error || !data) throw new Error(error?.message || "Error al eliminar la propiedad");

	const { data: files, error: listError } = await supabase.storage
		.from(IMAGE_BUCKET)
		.list(String(id));
	if (listError) throw new Error(listError.message);
	if (!files || files.length === 0) return;

	const filePaths = files.map((file) => `${id}/${file.name}`);
	const { error: deleteError } = await supabase.storage.from(IMAGE_BUCKET).remove(filePaths);
	if (deleteError) throw new Error(deleteError.message);
};
