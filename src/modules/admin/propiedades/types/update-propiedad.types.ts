export interface UpdatePropiedad {
	id: number;
	propiedad?: {
		calle?: string;
		entre_calles?: string;
		numero?: number;
		map_location?: {
			type: "Point";
			coordinates: [number, number];
		};
		descripcion?: string;
		tipo_propiedad?: number;
		destacada?: boolean;
	};
	localidad_name?: string;
	ambientes?: Record<string, boolean>;
	caracteristicas?: Record<string, boolean>;
	detalles?: Record<string, unknown>;
	servicios?: Record<string, boolean>;
	imagenes?: {
		url: string;
		principal: boolean;
	}[];
	precios?: {
		estado_publicacion_id: number;
		importe?: number;
		divisa?: string;
		delete?: boolean;
	}[];
}
