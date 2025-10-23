export interface PropiedadFilters {
	destacadas?: boolean;
	tipoPropiedad?: string;
	localidad?: string;
	dormitorios?: number;
	precioMin?: number;
	precioMax?: number;
	caracteristicas?: string[];
	ambientes?: string[];
	servicios?: string[];
	superficieMin?: number;
	superficieMax?: number;
	divisa: "ARS" | "USD";
	banos?: number;
	ambientesContador?: number;
	pisos?: number;
}

export type CounterField = "dormitorios" | "banos" | "ambientesContador" | "pisos";
export type CheckboxField = "caracteristicas" | "ambientes" | "servicios";

export interface FilterOption {
	value: string;
	label: string;
}

export interface FilterData {
	caracteristicas: FilterOption[];
	ambientes: FilterOption[];
	servicios: FilterOption[];
	tiposPropiedad: FilterOption[];
	localidades: FilterOption[];
}

export type Caracteristica = {
	id: number;
	[key: string]: boolean | number;
};

export type Ambiente = {
	id: number;
	[key: string]: boolean | number;
};

export type Servicio = {
	id: number;
	[key: string]: boolean | number;
};

export type TipoPropiedad = {
	id: number;
	tipo: string;
	created_at: string;
};

export type Localidad = {
	id: number;
	nombre: string;
	created_at: string;
};
