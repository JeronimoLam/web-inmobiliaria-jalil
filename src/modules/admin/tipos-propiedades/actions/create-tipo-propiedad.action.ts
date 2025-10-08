"use server";

import { createClient } from "@/modules/admin/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface actionResponse {
	success: boolean;
	error: string;
}

export const createTipoPropiedad = async (formData: FormData): Promise<actionResponse> => {
	const tipo = formData.get("tipo") as string;

	const supabase = await createClient();

	const { error } = await supabase.from("tipos_propiedades").insert({ tipo });

	if (error) {
		return { success: false, error: error?.message || "Error al crear el tipo de propiedad" };
	}

	revalidatePath("/admin/tipos-propiedades");
	return { success: true, error: "" };
};
