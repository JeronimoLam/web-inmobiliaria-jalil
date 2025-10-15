import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";

export type CreatePropiedad = {
	propiedad: {
		codigo: number;
		calle: string;
		entre_calles: string;
		numero: number | undefined;
		map_location: {
			type: "Point";
			coordinates: [number, number];
		};
		descripcion: string;
		has_expensas: boolean;
		expensas_value: number | undefined;
		expensas_divisa: string | undefined;
		tipo_propiedad: number | undefined;
		destacada: boolean;
	};
	localidad_name: string;
	ambientes: {
		altillo: boolean;
		balcon: boolean;
		baulera: boolean;
		biblioteca: boolean;
		cocina: boolean;
		comedor: boolean;
		comedor_diario: boolean;
		dependencia: boolean;
		escritorio: boolean;
		galeria: boolean;
		hall: boolean;
		jardin: boolean;
		lavadero: boolean;
		living: boolean;
		living_comedor: boolean;
		oficina: boolean;
		patio: boolean;
		sotano: boolean;
		suite: boolean;
		terraza: boolean;
		toilette: boolean;
		vestidor: boolean;
	};
	caracteristicas: {
		acceso_playa: boolean;
		agua_caliente_central: boolean;
		aire_acondicionado_individual: boolean;
		alarma: boolean;
		amoblado: boolean;
		calefaccion_individual: boolean;
		deck: boolean;
		lavadero: boolean;
		apto_credito: boolean;
		apto_mascotas: boolean;
		apto_profesional: boolean;
		calefaccion: boolean;
		calefaccion_central: boolean;
		calefaccion_por_aire: boolean;
		calefaccion_por_radiadores: boolean;
		centro_de_deportes: boolean;
		cochera_subterranea: boolean;
		en_construccion: boolean;
		gimnasio: boolean;
		hidromasaje: boolean;
		laundry: boolean;
		lote_interno: boolean;
		luminoso: boolean;
		parrilla: boolean;
		perimetral: boolean;
		pileta: boolean;
		preinstalacion_aire_acondicionado: boolean;
		quincho: boolean;
		riego_automatico: boolean;
		ruta: boolean;
		sala_de_juegos: boolean;
		sauna: boolean;
		seguridad: boolean;
		seguridad_24hs: boolean;
		seguridad_dia: boolean;
		seguridad_porteria: boolean;
		solarium: boolean;
		sum: boolean;
	};
	detalles: {
		ambientes: number | undefined;
		superficie_lote: number | undefined;
		superficie_cubierta: number | undefined;
		superficie_total_construida: number | undefined;
		medida_frontal: number | undefined;
		medida_profundidad: number | undefined;
		antiguedad: string;
		dormitorios: number | undefined;
		habitaciones: number | undefined;
		banos: number | undefined;
		garage: string;
		pisos: number | undefined;
		toilettes: number | undefined;
	};
	servicios: {
		agua_corriente: boolean;
		cloaca: boolean;
		electricidad: boolean;
		gas_natural: boolean;
		internet: boolean;
		pavimento: boolean;
		telefono: boolean;
		videocable: boolean;
	};
	imagenes: {
		url: string;
		principal: boolean;
	}[];
	precios: {
		estado_publicacion_id: OperacionesEnum;
		importe: number | undefined;
		divisa: string;
	}[];
};

export type PropiedadCreatedResponse = {
	propiedad_id: number;
	success: boolean;
};
