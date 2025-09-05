import { propiedades } from "../data/propiedades.data";
import { OperacionesEnum } from "../enums/propiedades.enum";
import { EstadoPublicacionEnum, Propiedad } from "../types/propiedad.type";

export class PropiedadesService {
	static async getPropiedades(): Promise<Propiedad[]> {
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

	static async getPropiedadesVentaDestacados(): Promise<Propiedad[]> {
		try {
			const response = new Promise<Propiedad[]>((resolve) => {
				setTimeout(() => {
					resolve(propiedades.filter((p) => p.destacada));
				}, 1000);
			});
			return await response;
		} catch {
			return [];
		}
	}

	static async getPropiedadesAlquilerDestacados(): Promise<Propiedad[]> {
		try {
			const response = new Promise<Propiedad[]>((resolve) => {
				setTimeout(() => {
					resolve(propiedades.filter((p) => p.destacada));
				}, 1000);
			});
			return await response;
		} catch {
			return [];
		}
	}

	static async getPropiedad(codigo: number, operacion: OperacionesEnum): Promise<Propiedad | null> {
		try {
			const response = new Promise<Propiedad | null>((resolve) => {
				setTimeout(() => {
					const propiedad = propiedades.find((p) => p.codigo === codigo);
					if (propiedad) {
						// Filtra los precios por la operación solicitada
						const preciosFiltrados = propiedad.precios.filter(
							(precio) =>
								(operacion === OperacionesEnum.ALQUILER &&
									precio.estado_publicacion.nombre === EstadoPublicacionEnum.ALQUILER) ||
								(operacion === OperacionesEnum.VENTA &&
									precio.estado_publicacion.nombre === EstadoPublicacionEnum.VENTA),
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
}
