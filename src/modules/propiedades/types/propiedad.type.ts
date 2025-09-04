export type Propiedad = {
	id: number;
	codigo: number;
	destacada: boolean;
	tipo_propiedad: TipoPropiedad;
	calle: string;
	entre_calles: string;
	numero: number;
	descripcion: string;
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

export type Detalles = {
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

export type Imagenes = {
	id: number;
	url: string;
	principal: boolean;
	created_at: Date;
};

export type Localidad = {
	id: number;
	nombre: string;
};

export type MapLocation = {
	type: string;
	coordinates: number[];
};

export type Precio = {
	id: number;
	divisa: string;
	importe: number;
	created_at: Date;
	updated_at: Date;
	estado_publicacion: {
		id: number;
		nombre: EstadoPublicacionEnum;
	};
};

export type TipoPropiedad = {
	id: number;
	value: string;
};

export enum EstadoPublicacionEnum {
	ALQUILER = "Alquiler",
	VENTA = "Venta",
}
