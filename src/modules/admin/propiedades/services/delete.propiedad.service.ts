import { createClient } from "../../utils/supabase/client";

export const deletePropiedad = async (id: number) => {
	const supabase = createClient();

	const { data, error } = await supabase.functions.invoke(`delete-propiedad?id=${id}`, {
		method: "DELETE",
	});

	if (error || !data) throw new Error(error?.message || "Error al eliminar la propiedad");
};
