import { OperacionesEnum } from "../enums/propiedades.enum";
import { Propiedad } from "../types/propiedad.type";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";

export const getHeaders = () => {
	return {
		Authorization: `Bearer ${SUPABASE_KEY}`,
		apikey: SUPABASE_KEY,
	};
};

export const getPropiedad = async (
	codigo: number,
	operacion: OperacionesEnum,
): Promise<Propiedad | null> => {
	try {
		let response;
		if (operacion === OperacionesEnum.ALQUILER) {
			response = await fetch(`${SUPABASE_URL}/rest/v1/propiedades_alquiler?codigo=eq.${codigo}`, {
				headers: getHeaders(),
				cache: "no-store",
			});
		} else {
			response = await fetch(`${SUPABASE_URL}/rest/v1/propiedades_venta?codigo=eq.${codigo}`, {
				headers: getHeaders(),
				cache: "no-store",
			});
		}
		console.log(response);
		if (!response.ok) {
			throw new Error("Error fetching propiedad");
		}

		const data = await response.json();

		const propiedad = Array.isArray(data) ? data[0] : data;

		return propiedad || null;
	} catch (error) {
		console.log(error);
		return null;
	}
};
