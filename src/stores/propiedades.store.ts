import { create } from "zustand";
import { EstadoPublicacionEnum, Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { propiedades } from "@/modules/propiedades/data/propiedades.data";
import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";
import { PropiedadesService } from "@/modules/propiedades/services/propiedades.service";

interface PropiedadesState {
	propiedades: Propiedad[];
	loading: boolean;
	error: string;
	getPropiedadesAlquiler: () => Promise<void>;
	getPropiedadesVenta: () => Promise<void>;
	getPropiedad: (id: number, operacion: OperacionesEnum) => Promise<Propiedad | null>;
}

export const usePropiedadesStore = create<PropiedadesState>((set) => ({
	propiedades: [],
	loading: false,
	error: "",
	getPropiedadesAlquiler: async () => {
		// Simula una llamada a API
		// const response = await fetch("/api/propiedades");
		// const data = await response.json();
		setTimeout(async () => {
			const data = await propiedades;
			set({ propiedades: data });
		}, 1000);
	},
	getPropiedadesVenta: async () => {
		// Simula una llamada a API
		// const response = await fetch("/api/propiedades");
		// const data = await response.json();
		setTimeout(async () => {
			const data = await propiedades;
			set({ propiedades: data });
		}, 1000);
	},
	getPropiedad: async (id: number, operacion: OperacionesEnum) => {
		set({ loading: true, error: "" });
		try {
			const propiedad = await PropiedadesService.getPropiedad(id, operacion);
			set({ loading: false });
			if (!propiedad) {
				set({ error: "Propiedad no encontrada" });
			}
			return propiedad;
		} catch (error) {
			if (error instanceof Error) {
				set({ loading: false, error: error.message });
			} else {
				set({ loading: false, error: "Error al obtener la propiedad" });
			}
			return null;
		}
	},
}));
