"use server";

import { createClient } from "@/modules/admin/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface actionResponse {
	success: boolean;
	error: string;
}

export const updateLocalidad = async (formData: FormData): Promise<actionResponse> => {
	const id = parseInt(formData.get("id") as string);
	const nombre = formData.get("nombre") as string;

	const supabase = await createClient();

	const { error } = await supabase.from("localidades").update({ nombre }).eq("id", id);

	if (error) {
		return { success: false, error: error?.message || "Error al actualizar la localidad" };
	}

	revalidatePath("/admin/localidades");
	return { success: true, error: "" };
};
