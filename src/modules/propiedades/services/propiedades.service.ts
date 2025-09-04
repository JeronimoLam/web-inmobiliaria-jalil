import { OperacionesEnum } from "../enums/propiedades.enum";
import { Propiedad } from "../types/propiedad.type";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";

export class PropiedadesService {
	static async getPropiedades(): Promise<Propiedad[]> {
		try {
			const response = await fetch(`${SUPABASE_URL}/propiedades_full`, {
				headers: {
					Authorization: `Bearer ${SUPABASE_KEY}`,
					apikey: SUPABASE_KEY,
				},
			});
			const data = await response.json();
			return data;
		} catch {
			return [];
		}
	}

	static async getPropiedadesVenta(): Promise<Propiedad[]> {
		try {
			const response = await fetch(`${SUPABASE_URL}/propiedades_venta`, {
				headers: {
					Authorization: `Bearer ${SUPABASE_KEY}`,
					apikey: SUPABASE_KEY,
				},
			});
			const data = await response.json();
			return data;
		} catch {
			return [];
		}
	}

	static async getPropiedadesAlquiler(): Promise<Propiedad[]> {
		try {
			const response = await fetch(`${SUPABASE_URL}/propiedades_alquiler`, {
				headers: {
					Authorization: `Bearer ${SUPABASE_KEY}`,
					apikey: SUPABASE_KEY,
				},
			});
			const data = await response.json();
			return data;
		} catch {
			return [];
		}
	}

	static async getPropiedadesVentaDestacados(): Promise<Propiedad[]> {
		try {
			const response = await fetch(`${SUPABASE_URL}/propiedades_venta?destacada=eq.true`, {
				headers: {
					Authorization: `Bearer ${SUPABASE_KEY}`,
					apikey: SUPABASE_KEY,
				},
			});
			const data = await response.json();
			return data;
		} catch {
			return [];
		}
	}

	static async getPropiedadesAlquilerDestacados(): Promise<Propiedad[]> {
		try {
			const response = await fetch(`${SUPABASE_URL}/propiedades_alquiler?destacada=eq.true`, {
				headers: {
					Authorization: `Bearer ${SUPABASE_KEY}`,
					apikey: SUPABASE_KEY,
				},
			});
			const data = await response.json();
			return data;
		} catch {
			return [];
		}
	}

	static async getPropiedad(codigo: number, operacion: OperacionesEnum): Promise<Propiedad | null> {
		try {
			let response;
			if (operacion === OperacionesEnum.ALQUILER) {
				response = await fetch(`${SUPABASE_URL}/propiedades_alquiler?id=eq.${codigo}`, {
					headers: {
						Authorization: `Bearer ${SUPABASE_KEY}`,
						apikey: SUPABASE_KEY,
					},
				});
			} else {
				response = await fetch(`${SUPABASE_URL}/propiedades_venta?id=eq.${codigo}`, {
					headers: {
						Authorization: `Bearer ${SUPABASE_KEY}`,
						apikey: SUPABASE_KEY,
					},
				});
			}

			if (!response.ok) {
				throw new Error("Error fetching propiedad");
			}

			const propiedad = await response.json();

			return propiedad;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}
