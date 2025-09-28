import { createClient } from "../../utils/supabase/client";

export const deletePropiedad = async (code: number) => {
	const supabase = createClient();
	console.log("Codigo a eliminar:", code);

	const { data, error } = await supabase.functions.invoke(`delete-propiedad?id=${code}`, {
		method: "DELETE",
	});
	console.log("Data:", data);
	if (error || !data) throw new Error(error?.message || "Error al eliminar la propiedad");
	console.log("Propiedad eliminada correctamente", data);
};
