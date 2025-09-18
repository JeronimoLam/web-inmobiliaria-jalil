"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import {
	CheckboxField,
	CounterField,
	PropiedadFilters,
} from "@/modules/filters/types/filters.type";
import { LIMITS, DEFAULT_FILTERS } from "@/modules/filters/constants/filters.constants";
import { useURLSync } from "@/modules/filters/hooks/useURLSync";
import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";

interface FiltersContextType {
	filters: PropiedadFilters;
	operacion: OperacionesEnum;
	resetFilters: () => void;
	handleFilters: () => void;
	getActiveFiltersCount: () => number;
	incrementCounter: (field: CounterField) => void;
	decrementCounter: (field: CounterField) => void;
	toggleCheckbox: (value: string, field: CheckboxField) => void;
	updateTipoPropiedad: (value: string) => void;
	updateLocalidad: (value: string) => void;
	updatePrecio: (min: number, max: number) => void;
	updateSuperficie: (field: "superficieMin" | "superficieMax", value: string) => void;
	updateOperacion: (value: OperacionesEnum) => void;
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
	const [operacion, setOperacion] = useState<OperacionesEnum>(OperacionesEnum.ALQUILER);
	const { syncFiltersWithURL } = useURLSync({ setFilters, setOperacion });

	const handleFilters = () => {
		syncFiltersWithURL(filters, operacion);
	};

	const resetFilters = () => {
		const newFilters = {
			...DEFAULT_FILTERS,
		};
		setFilters(newFilters);
		syncFiltersWithURL(newFilters, operacion);
	};

	const getActiveFiltersCount = () => {
		let count = 0;

		if (filters.tipoPropiedad) count++;
		if (filters.localidad) count++;
		if (filters.dormitorios && filters.dormitorios > 0) count++;
		if (filters.banos && filters.banos > 0) count++;
		if (filters.ambientesContador && filters.ambientesContador > 0) count++;
		if (filters.pisos && filters.pisos > 0) count++;
		if (
			(filters.precioMin && filters.precioMin > LIMITS.MIN_PRECIO) ||
			(filters.precioMax && filters.precioMax < LIMITS.MAX_PRECIO)
		)
			count++;
		if (filters.caracteristicas && filters.caracteristicas.length > 0) count++;
		if (filters.ambientes && filters.ambientes.length > 0) count++;
		if (filters.servicios && filters.servicios.length > 0) count++;
		if (filters.superficieMin && filters.superficieMin > 0) count++;
		if (filters.superficieMax && filters.superficieMax > 0) count++;

		return count;
	};

	const updateCounter = (field: CounterField, operation: "increment" | "decrement") => {
		setFilters((prev) => {
			const currentValue = prev[field] ?? 0;
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
			const currentItems = prev[field] ?? [];
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

	const updateLocalidad = (value: string) => {
		setFilters((prev) => ({ ...prev, localidad: value }));
	};

	const updatePrecio = (min: number, max: number) => {
		setFilters((prev) => ({ ...prev, precioMin: min, precioMax: max }));
	};

	const updateSuperficie = (field: "superficieMin" | "superficieMax", value: string) => {
		setFilters((prev) => ({ ...prev, [field]: value }));
	};

	const updateOperacion = (value: OperacionesEnum) => {
		setOperacion(value);
	};

	const value: FiltersContextType = {
		filters,
		operacion,
		resetFilters,
		handleFilters,
		getActiveFiltersCount,
		incrementCounter,
		decrementCounter,
		toggleCheckbox,
		updateTipoPropiedad,
		updateLocalidad,
		updatePrecio,
		updateSuperficie,
		updateOperacion,
	};

	return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
};
