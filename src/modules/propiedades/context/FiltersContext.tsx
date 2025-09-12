"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import {
	CheckboxField,
	CounterField,
	PropiedadFilters,
} from "@/modules/propiedades/types/filters.type";
import { LIMITS, DEFAULT_FILTERS } from "@/modules/propiedades/constants/filters.constants";
import { useURLSync } from "@/modules/propiedades/hooks/useURLSync";

interface FiltersContextType {
	filters: PropiedadFilters;
	resetFilters: () => void;
	handleFilters: () => void;
	getActiveFiltersCount: () => number;
	incrementCounter: (field: CounterField) => void;
	decrementCounter: (field: CounterField) => void;
	toggleCheckbox: (value: string, field: CheckboxField) => void;
	updateTipoPropiedad: (value: string) => void;
	updateUbicacion: (value: string) => void;
	updatePrecio: (value: [number, number]) => void;
	updateSuperficie: (field: "superficieMin" | "superficieMax", value: string) => void;
	updateOperacion: (value: "venta" | "alquiler") => void;
}

const FiltersContext = createContext<FiltersContextType | null>(null);

export const useFiltersContext = () => {
	const context = useContext(FiltersContext);
	if (!context) {
		throw new Error("useFiltersContext debe ser usado dentro de un FiltersProvider");
	}
	return context;
};

interface FiltersProviderProps {
	children: ReactNode;
}

export const FiltersProvider = ({ children }: FiltersProviderProps) => {
	const [filters, setFilters] = useState<PropiedadFilters>(DEFAULT_FILTERS);
	const { syncFiltersWithURL } = useURLSync({ setFilters });

	const handleFilters = () => {
		syncFiltersWithURL(filters);
	};

	const resetFilters = () => {
		const newFilters = {
			...DEFAULT_FILTERS,
			operacion: filters.operacion,
		};
		setFilters(newFilters);
		syncFiltersWithURL(newFilters);
	};

	const getActiveFiltersCount = () => {
		let count = 0;

		if (filters.tipoPropiedad) count++;
		if (filters.ubicacion) count++;
		if (filters.dormitorios > 0) count++;
		if (filters.banos > 0) count++;
		if (filters.ambientesContador > 0) count++;
		if (filters.niveles > 0) count++;
		if (filters.precio[0] > LIMITS.MIN_PRECIO || filters.precio[1] < LIMITS.MAX_PRECIO) count++;
		if (filters.caracteristicas.length > 0) count++;
		if (filters.ambientes.length > 0) count++;
		if (filters.servicios.length > 0) count++;
		if (filters.superficieMin) count++;
		if (filters.superficieMax) count++;

		return count;
	};

	const updateCounter = (field: CounterField, operation: "increment" | "decrement") => {
		setFilters((prev) => {
			const currentValue = prev[field];
			let newValue: number;

			if (operation === "increment") {
				newValue =
					field === "dormitorios"
						? Math.min(LIMITS.MAX_DORMITORIOS, currentValue + 1)
						: currentValue + 1;
			} else {
				newValue = Math.max(LIMITS.MIN_COUNTER_VALUE, currentValue - 1);
			}

			return { ...prev, [field]: newValue };
		});
	};

	const incrementCounter = (field: CounterField) => updateCounter(field, "increment");
	const decrementCounter = (field: CounterField) => updateCounter(field, "decrement");

	const toggleCheckbox = (value: string, field: CheckboxField) => {
		setFilters((prev) => {
			const currentItems = prev[field];
			const newItems = currentItems.includes(value)
				? currentItems.filter((item) => item !== value)
				: [...currentItems, value];

			return {
				...prev,
				[field]: newItems,
			};
		});
	};

	const updateTipoPropiedad = (value: string) => {
		setFilters((prev) => ({ ...prev, tipoPropiedad: value }));
	};

	const updateUbicacion = (value: string) => {
		setFilters((prev) => ({ ...prev, ubicacion: value }));
	};

	const updatePrecio = (value: [number, number]) => {
		setFilters((prev) => ({ ...prev, precio: value }));
	};

	const updateSuperficie = (field: "superficieMin" | "superficieMax", value: string) => {
		setFilters((prev) => ({ ...prev, [field]: value }));
	};

	const updateOperacion = (value: "venta" | "alquiler") => {
		setFilters((prev) => ({ ...prev, operacion: value }));
	};

	const value: FiltersContextType = {
		filters,
		resetFilters,
		handleFilters,
		getActiveFiltersCount,
		incrementCounter,
		decrementCounter,
		toggleCheckbox,
		updateTipoPropiedad,
		updateUbicacion,
		updatePrecio,
		updateSuperficie,
		updateOperacion,
	};

	return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
};
