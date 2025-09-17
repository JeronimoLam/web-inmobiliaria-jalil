export interface PropiedadFilters {
	operacion: "venta" | "alquiler";
	tipoPropiedad: string;
	localidad: string;
	dormitorios: number;
	precioMin: number;
	precioMax: number;
	caracteristicas: string[];
	ambientes: string[];
	servicios: string[];
	superficieMin: string;
	superficieMax: string;
	banos: number;
	ambientesContador: number;
	pisos: number;
}

export type CounterField = "dormitorios" | "banos" | "ambientesContador" | "pisos";
export type CheckboxField = "caracteristicas" | "ambientes" | "servicios";
