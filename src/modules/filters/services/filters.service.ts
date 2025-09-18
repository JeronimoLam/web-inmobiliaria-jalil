import { FiltersApiService } from "@/modules/filters/services/filtersApi.service";
import { FilterData } from "@/modules/filters/types/filters.type";

const stringFormat = (key: string) => {
	return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

const inputFormat = (set: Set<string>) => {
	return Array.from(set).map((key) => ({
		value: key,
		label: stringFormat(key),
	}));
};

export class FiltersService {
	static async getCaracteristicas() {
		try {
			const caracteristicas = await FiltersApiService.getCaracteristicas();
			const caracteristicasForInputs = new Set<string>();

			caracteristicas.forEach((item) => {
				Object.keys(item).forEach((key) => {
					if (key !== "id") {
						caracteristicasForInputs.add(key);
					}
				});
			});

			return inputFormat(caracteristicasForInputs);
		} catch (error) {
			console.error("Error fetching características:", error);
			return [];
		}
	}

	static async getAmbientes() {
		try {
			const ambientes = await FiltersApiService.getAmbientes();
			const ambientesForInputs = new Set<string>();

			ambientes.forEach((item) => {
				Object.keys(item).forEach((key) => {
					if (key !== "id") {
						ambientesForInputs.add(key);
					}
				});
			});

			return inputFormat(ambientesForInputs);
		} catch (error) {
			console.error("Error fetching ambientes:", error);
			return [];
		}
	}

	static async getServicios() {
		try {
			const servicios = await FiltersApiService.getServicios();
			const serviciosForInputs = new Set<string>();

			servicios.forEach((item) => {
				Object.keys(item).forEach((key) => {
					if (key !== "id") {
						serviciosForInputs.add(key);
					}
				});
			});

			return inputFormat(serviciosForInputs);
		} catch (error) {
			console.error("Error fetching servicios:", error);
			return [];
		}
	}

	static async getTiposPropiedad() {
		try {
			const tiposPropiedad = await FiltersApiService.getTiposPropiedad();
			const tiposPropiedadForInputs = new Set<string>();

			tiposPropiedad.forEach((item) => {
				if (item.tipo) {
					tiposPropiedadForInputs.add(item.tipo);
				}
			});

			return inputFormat(tiposPropiedadForInputs);
		} catch (error) {
			console.error("Error fetching tipos de propiedad:", error);
			return [];
		}
	}

	static async getLocalidades() {
		try {
			const ubicaciones = await FiltersApiService.getLocalidades();
			const ubicacionesForInputs = new Set<string>();

			ubicaciones.forEach((item) => {
				if (item.nombre) {
					ubicacionesForInputs.add(item.nombre);
				}
			});

			return inputFormat(ubicacionesForInputs);
		} catch (error) {
			console.error("Error fetching localidades:", error);
			return [];
		}
	}

	static async getAll(): Promise<FilterData> {
		try {
			const [caracteristicas, ambientes, servicios, tiposPropiedad, localidades] =
				await Promise.all([
					this.getCaracteristicas(),
					this.getAmbientes(),
					this.getServicios(),
					this.getTiposPropiedad(),
					this.getLocalidades(),
				]);

			return {
				caracteristicas,
				ambientes,
				servicios,
				tiposPropiedad,
				localidades,
			};
		} catch (error) {
			console.error("Error fetching filter data:", error);
			return {
				caracteristicas: [],
				ambientes: [],
				servicios: [],
				tiposPropiedad: [],
				localidades: [],
			};
		}
	}
}
