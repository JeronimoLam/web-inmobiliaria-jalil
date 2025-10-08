"use server";

import { createClient } from "@/modules/admin/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface actionResponse {
	success: boolean;
	error: string;
}

export const updateTipoPropiedad = async (formData: FormData): Promise<actionResponse> => {
	const id = parseInt(formData.get("id") as string);
	const tipo = formData.get("tipo") as string;

	const supabase = await createClient();

	const { error } = await supabase.from("tipos_propiedades").update({ tipo }).eq("id", id);

	if (error) {
		return { success: false, error: error?.message || "Error al actualizar el tipo de propiedad" };
	}

	revalidatePath("/admin/tipos-propiedades");
	return { success: true, error: "" };
};
