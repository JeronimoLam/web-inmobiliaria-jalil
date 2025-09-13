import { OperacionesEnum } from "../enums/propiedades.enum";
import { Propiedad } from "../types/propiedad.type";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";

export class PropiedadesService {
	private static getHeaders() {
		return {
			Authorization: `Bearer ${SUPABASE_KEY}`,
			apikey: SUPABASE_KEY,
		};
	}

	static getPropiedades = async (): Promise<Propiedad[]> => {
		try {
			const response = await fetch(`${SUPABASE_URL}/propiedades_full`, {
				headers: this.getHeaders(),
				next: { revalidate: 300 },
			});
			const data = await response.json();
			return data;
		} catch {
			return [];
		}
	};

	static getPropiedadesVenta = async (): Promise<Propiedad[]> => {
		try {
			const response = await fetch(`${SUPABASE_URL}/propiedades_venta`, {
				headers: this.getHeaders(),
				next: { revalidate: 300 },
			});
			const data = await response.json();
			return data;
		} catch {
			return [];
		}
	};

	static getPropiedadesAlquiler = async (): Promise<Propiedad[]> => {
		try {
			const response = await fetch(`${SUPABASE_URL}/propiedades_alquiler`, {
				headers: this.getHeaders(),
				next: { revalidate: 300 },
			});
			const data = await response.json();
			return data;
		} catch {
			return [];
		}
	};

	static getPropiedadesVentaDestacados = async (): Promise<Propiedad[]> => {
		try {
			const response = await fetch(`${SUPABASE_URL}/propiedades_venta?destacada=eq.true`, {
				headers: this.getHeaders(),
				next: { revalidate: 300 },
			});
			const data = await response.json();
			return data;
		} catch {
			return [];
		}
	};

	static getPropiedadesAlquilerDestacados = async (): Promise<Propiedad[]> => {
		try {
			const response = await fetch(`${SUPABASE_URL}/propiedades_alquiler?destacada=eq.true`, {
				headers: this.getHeaders(),
				next: { revalidate: 300 },
			});
			const data = await response.json();
			return data;
		} catch {
			return [];
		}
	};

	static getPropiedad = async (
		codigo: number,
		operacion: OperacionesEnum,
	): Promise<Propiedad | null> => {
		try {
			let response;
			if (operacion === OperacionesEnum.ALQUILER) {
				response = await fetch(`${SUPABASE_URL}/propiedades_alquiler?id=eq.${codigo}`, {
					headers: this.getHeaders(),
					cache: "no-store",
				});
			} else {
				response = await fetch(`${SUPABASE_URL}/propiedades_venta?id=eq.${codigo}`, {
					headers: this.getHeaders(),
					cache: "no-store",
				});
			}

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
}
