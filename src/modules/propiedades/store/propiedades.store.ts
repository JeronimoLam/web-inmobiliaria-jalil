import { create } from "zustand";

interface PropiedadesStore {
	showListOnly: boolean;
	showMapOnly: boolean;
	setShowListOnly: (value: boolean) => void;
	setShowMapOnly: (value: boolean) => void;
	hasPropiedades: boolean;
	setHasPropiedades: (value: boolean) => void;
}

export const usePropiedadesStore = create<PropiedadesStore>((set) => ({
	showListOnly: true,
	showMapOnly: false,
	setShowListOnly: (value) => set({ showListOnly: value }),
	setShowMapOnly: (value) => set({ showMapOnly: value }),
	hasPropiedades: true,
	setHasPropiedades: (value) => set({ hasPropiedades: value }),
}));
