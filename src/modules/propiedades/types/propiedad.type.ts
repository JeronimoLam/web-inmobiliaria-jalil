export type Propiedad = {
	id: number;
	codigo: number;
	imagenes: Imagen[];
	tipo_propiedad: TipoPropiedad;
	calle: string;
	entre_calles: string | null;
	numero: number | null;
	localidad: Localidad;
	descripcion: string;
	cant_ambientes: number | null;
	dormitorios: number | null;
	pisos: number | null;
	cocheras: number | null;
	antiguedad: string | null;
	superficie_cubierta: number | null;
	superficie_terreno: number | null;
	superficie_total_construida: number | null;
	medida_frontal: number | null;
	medida_profundidad: number | null;
	cantidad_toilettes: number | null;
	cantidad_banos: number | null;
	map_location: MapLocation;
	precios: Precio[];
	caracteristicas: Caracteristicas;
	servicios: Servicios;
	ambientes: { [key: string]: boolean };
	created_at: Date;
	updated_at: Date;
};

export type Imagen = {
	url: string;
};

export type Localidad = {
	nombre: string;
};

export type Caracteristicas = {
	deck: boolean;
	alarma: boolean;
	amoblado: boolean;
	lavadero: boolean;
	acceso_playa: boolean;
	agua_caliente_central: boolean;
	calefaccion_individual: boolean;
	aire_acondicionado_individual: boolean;
};

export type MapLocation = {
	type: string;
	coordinates: number[];
};

export type Precio = {
	divisa: string;
	importe: number;
	created_at: Date;
	updated_at: Date;
	estado_publicacion: EstadoPublicacionEnum;
};

export enum EstadoPublicacionEnum {
	ALQUILER = "Alquiler",
	VENTA = "Venta",
}

export type Servicios = {
	cloaca: boolean;
	internet: boolean;
	telefono: boolean;
	pavimento: boolean;
	videocable: boolean;
	gas_natural: boolean;
	electricidad: boolean;
	agua_corriente: boolean;
};

export type TipoPropiedad = {
	id: number;
	value: string;
};
