import { createClient } from "../../utils/supabase/client";
import { CreatePropiedad, PropiedadResponse } from "../types/create-propiedad.type";

export const createPropiedad = async (
	newPropiedad: CreatePropiedad,
): Promise<PropiedadResponse> => {
	console.log("New propiedad:", newPropiedad);
	const supabase = createClient();

	const response = await supabase.functions.invoke("create-propiedad", {
		body: newPropiedad,
	});

	if (response.error) {
		console.error("Supabase function error:", response.error);
		throw new Error(response.error.message || "Error al crear la propiedad");
	}

	// Verificar si la respuesta tiene un error de estado HTTP
	if (!response.data) {
		throw new Error("No se recibió respuesta del servidor");
	}

	console.log("Response:", response.data);

	return response.data;
};
