"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/modules/admin/utils/supabase/server";

export const deleteLocalidad = async (formData: FormData) => {
	const id = parseInt(formData.get("id") as string);

	const supabase = await createClient();

	const { error } = await supabase.from("localidades").delete().eq("id", id);

	if (error) throw new Error(error.message || "Error al eliminar la localidad");

	revalidatePath("/admin/localidades");

	return { success: true, error: "" };
};
