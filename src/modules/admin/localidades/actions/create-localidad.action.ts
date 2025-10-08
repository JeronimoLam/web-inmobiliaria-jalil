"use server";

import { createClient } from "@/modules/admin/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface actionResponse {
	success: boolean;
	error: string;
}

export const createLocalidad = async (formData: FormData): Promise<actionResponse> => {
	const nombre = formData.get("nombre") as string;

	const supabase = await createClient();

	const { error } = await supabase.from("localidades").insert({ nombre });

	if (error) {
		return { success: false, error: error?.message || "Error al crear la localidad" };
	}

	revalidatePath("/admin/localidades");
	return { success: true, error: "" };
};
