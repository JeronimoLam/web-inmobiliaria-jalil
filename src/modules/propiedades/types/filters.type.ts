export interface FilterProps {
	tipoPropiedad: string;
	ubicacion: string;
	dormitorios: number;
	precio: [number, number];
	caracteristicas: string[];
	ambientes: string[];
	servicios: string[];
	superficieMin: string;
	superficieMax: string;
	banos: number;
	ambientesContador: number;
	niveles: number;
}

export type CounterField = "dormitorios" | "banos" | "ambientesContador" | "niveles";
export type CheckboxField = "caracteristicas" | "ambientes" | "servicios";
