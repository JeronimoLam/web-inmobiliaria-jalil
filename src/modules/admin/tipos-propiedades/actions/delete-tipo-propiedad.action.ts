"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../utils/supabase/server";

export const deleteTipoPropiedad = async (formData: FormData) => {
	const id = parseInt(formData.get("id") as string);

	const supabase = await createClient();

	const { error } = await supabase.from("tipos_propiedades").delete().eq("id", id);

	if (error) throw new Error(error.message || "Error al eliminar el tipo de propiedad");

	revalidatePath("/admin/tipos-propiedades");

	return { success: true, error: "" };
};
