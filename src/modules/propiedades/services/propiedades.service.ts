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
		const tableName = filtros.operacion === "venta" ? "propiedades_venta" : "propiedades_alquiler";
		const filterBuilder = supabase.from(tableName).select("*");

		if (filtros.tipoPropiedad) {
			filterBuilder.eq("tipo_propiedad->>value", filtros.tipoPropiedad);
		}
		if (filtros.localidad) {
			filterBuilder.eq("localidad->>nombre", filtros.localidad);
		}
		if (filtros.dormitorios && filtros.dormitorios > 0) {
			filterBuilder.eq("detalles->>dormitorios", filtros.dormitorios);
		}
		if (filtros.banos && filtros.banos > 0) {
			filterBuilder.eq("detalles->>banos", filtros.banos);
		}
		if (filtros.ambientesContador > 0) {
			filterBuilder.eq("detalles->>ambientes", filtros.ambientesContador);
		}
		if (filtros.pisos > 0) {
			filterBuilder.eq("detalles->>pisos", filtros.pisos);
		}

		if (filtros.precioMin > LIMITS.MIN_PRECIO) {
			filterBuilder.gte("precios->0->>importe", filtros.precioMin);
		}
		if (filtros.precioMax < LIMITS.MAX_PRECIO) {
			filterBuilder.lte("precios->0->>importe", filtros.precioMax);
		}

		if (filtros.superficieMin) {
			filterBuilder.gte("detalles->>superficie_lote", filtros.superficieMin);
		}
		if (filtros.superficieMax) {
			filterBuilder.lte("detalles->>superficie_lote", filtros.superficieMax);
		}

		const { data, error } = await filterBuilder;

		if (error) {
			console.error("Error Supabase:", error);
			return [];
		}

		let filteredData = data ?? [];

		// Se filtra en memoria, ya que supabase no soporta filtros dinámicos en campos JSON
		// Filtros de características, ambientes y servicios (checkboxes)
		if (filtros.caracteristicas.length > 0) {
			filteredData = filteredData.filter((propiedad: Propiedad) => {
				return filtros.caracteristicas.every(
					(caracteristica) =>
						propiedad.caracteristicas && propiedad.caracteristicas[caracteristica] === true,
				);
			});
		}

		if (filtros.ambientes.length > 0) {
			filteredData = filteredData.filter((propiedad: Propiedad) => {
				return filtros.ambientes.every(
					(ambiente) => propiedad.ambientes && propiedad.ambientes[ambiente] === true,
				);
			});
		}

		if (filtros.servicios.length > 0) {
			filteredData = filteredData.filter((propiedad: Propiedad) => {
				return filtros.servicios.every(
					(servicio) => propiedad.servicios && propiedad.servicios[servicio] === true,
				);
			});
		}

		return filteredData;
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
