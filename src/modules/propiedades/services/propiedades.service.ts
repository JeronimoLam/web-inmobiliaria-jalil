import { OperacionesEnum } from "../enums/propiedades.enum";
import { Propiedad } from "../types/propiedad.type";
import { PropiedadFilters } from "../types/filters.type";
import { supabase } from "@/lib/supabaseClient";
import { LIMITS } from "../constants/filters.constants";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";

export class PropiedadesService {
	private static getHeaders() {
		return {
			Authorization: `Bearer ${SUPABASE_KEY}`,
			apikey: SUPABASE_KEY,
		};
	}

	static getPropiedades = async (filtros: PropiedadFilters) => {
		// Usar la vista específica según la operación
		// const tableName = filtros.operacion === "venta" ? "propiedades_venta" : "propiedades_alquiler";
		// const filterBuilder = supabase.from(tableName).select("*");
		const filterBuilder = supabase.from("propiedades_full").select("*");

		console.log(filtros);

		if (filtros.tipoPropiedad) {
			filterBuilder.eq("tipo_propiedad->>value", filtros.tipoPropiedad);
		}
		if (filtros.localidad) {
			filterBuilder.eq("localidad->>nombre", filtros.localidad);
		}
		if (filtros.dormitorios && filtros.dormitorios > 0) {
			filterBuilder.eq("detalles->>dormitorios", filtros.dormitorios);
		}

		// Filtrar por rango de precios - buscar en el primer elemento del array de precios
		if (filtros.precioMin > LIMITS.MIN_PRECIO) {
			filterBuilder.gte("precios->0->>importe", filtros.precioMin);
		}
		if (filtros.precioMax < LIMITS.MAX_PRECIO) {
			filterBuilder.lte("precios->0->>importe", filtros.precioMax);
		}

		const { data, error } = await filterBuilder;

		if (error) console.error("Error Supabase:", error);
		return data ?? [];
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
