import { propiedades } from "../data/propiedades.data";
import { OperacionesEnum } from "../enums/propiedades.enum";
import { EstadoPublicacionEnum, Propiedad } from "../types/propiedad.type";

export class PropiedadesService {
	static async getPropiedad(id: number, operacion: OperacionesEnum): Promise<Propiedad | null> {
		// Simula una llamada a API
		// const response = await fetch(`/api/propiedades/${id}?operacion=${operacion}`);
		// const data = await response.json();

		try {
			const response = new Promise<Propiedad | null>((resolve) => {
				setTimeout(() => {
					const propiedad = propiedades.find((p) => p.id === id);
					if (propiedad) {
						// Filtra los precios por la operación solicitada
						const preciosFiltrados = propiedad.precios.filter(
							(precio) =>
								(operacion === OperacionesEnum.ALQUILER &&
									precio.estado_publicacion === EstadoPublicacionEnum.ALQUILER) ||
								(operacion === OperacionesEnum.VENTA &&
									precio.estado_publicacion === EstadoPublicacionEnum.VENTA),
						);
						// Devuelve la propiedad con solo los precios filtrados
						resolve({ ...propiedad, precios: preciosFiltrados });
					} else {
						resolve(null);
					}
				}, 1000);
			});
			const propiedad = await response;

			if (!propiedad) throw new Error("Propiedad no encontrada");

			return propiedad;
		} catch {
			return null;
		}
	}

	static async getPropiedades(): Promise<Propiedad[]> {
		// Simula una llamada a API
		// const response = await fetch(`/api/propiedades`);
		// const data = await response.json();

		try {
			const response = new Promise<Propiedad[]>((resolve) => {
				setTimeout(() => {
					resolve(propiedades);
				}, 1000);
			});
			return await response;
		} catch {
			return [];
		}
	}

	static async getPropiedadesVenta(): Promise<Propiedad[]> {
		// Simula una llamada a API
		// const response = await fetch(`/api/propiedades?operacion=venta`);
		// const data = await response.json();

		try {
			const response = new Promise<Propiedad[]>((resolve) => {
				setTimeout(() => {
					resolve(propiedades);
				}, 1000);
			});
			return await response;
		} catch {
			return [];
		}
	}

	static async getPropiedadesAlquiler(): Promise<Propiedad[]> {
		// Simula una llamada a API
		// const response = await fetch(`/api/propiedades?operacion=alquiler`);
		// const data = await response.json();

		try {
			const response = new Promise<Propiedad[]>((resolve) => {
				setTimeout(() => {
					resolve(propiedades);
				}, 1000);
			});
			return await response;
		} catch {
			return [];
		}
	}
}
