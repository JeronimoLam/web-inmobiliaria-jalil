import { OperacionesEnum } from "../enums/propiedades.enum";

export type Propiedad = {
	id: number;
	codigo: number;
	destacada: boolean;
	tipo_propiedad: TipoPropiedad;
	calle: string;
	entre_calles: string;
	numero: number;
	descripcion: string;
	expensas_value: number | null;
	expensas_divisa: string | null;
	map_location: MapLocation;
	localidad: Localidad;
	precios: Precio[];
	imagenes: Imagenes[];
	detalles: Detalles;
	servicios: { [key: string]: boolean };
	ambientes: { [key: string]: boolean };
	caracteristicas: { [key: string]: boolean };
	created_at: Date;
	updated_at: Date;
};

type Detalles = {
	id: number;
	banos: number;
	pisos: number;
	garage: string;
	ambientes: number;
	toilettes: number;
	antiguedad: string;
	created_at: Date;
	updated_at: Date;
	dormitorios: number;
	habitaciones: number;
	medida_frontal: number;
	superficie_lote: number;
	medida_profundidad: number;
	superficie_cubierta: number;
	superficie_total_construida: number;
};

type Imagenes = {
	id: number;
	url: string;
	principal: boolean;
	created_at: Date;
};

type Localidad = {
	id: number;
	nombre: string;
};

type MapLocation = {
	type: string;
	coordinates: number[];
};

type Precio = {
	id: number;
	divisa: string;
	importe: number;
	created_at: Date;
	updated_at: Date;
	estado_publicacion: {
		id: OperacionesEnum;
		nombre: "Alquiler" | "Venta";
	};
};

type TipoPropiedad = {
	id: number;
	value: string;
};

// Usamos OperacionesEnum para todas las comparaciones por id en lugar de por el nombre
// Asi evitamos problemas si en el futuro se cambia el nombre de alguna operacion
