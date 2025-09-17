import { OperacionesEnum } from "../enums/propiedades.enum";
import { Propiedad } from "../types/propiedad.type";

const createSlug = (text: string): string => {
	return text
		.toLowerCase()
		.normalize("NFD") // Separar acentos
		.replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
		.replace(/[^a-z0-9 -]/g, "") // Eliminar caracteres especiales
		.replace(/\s+/g, "-") // Reemplazar espacios con guiones
		.replace(/-+$/g, "") // Eliminar guiones al final
		.replace(/^-+/g, "") // Eliminar guiones al inicio
		.trim();
};

export const getPropiedadDetailUrl = (propiedad: Propiedad) => {
	const estadoPublicacion = propiedad.precios[0]?.estado_publicacion.nombre || "consulta";
	const direccion = `${createSlug(propiedad.calle).toLocaleLowerCase()}-${propiedad.numero ? "nro-" + propiedad.numero : ""}`;
	let operacion: OperacionesEnum;

	if (propiedad.precios[0]?.estado_publicacion.id === OperacionesEnum.ALQUILER) {
		operacion = OperacionesEnum.ALQUILER;
	} else {
		operacion = OperacionesEnum.VENTA;
	}

	const URL = {
		tipoPropiedad: createSlug(propiedad.tipo_propiedad.value).toLocaleLowerCase(),
		estadoPublicacion: `en-${estadoPublicacion.toLocaleLowerCase()}`,
		localidad: createSlug(propiedad.localidad.nombre.toLocaleLowerCase()),
		direccion: direccion.toLocaleLowerCase(),
		codigo: propiedad.codigo,
		query: {
			operacion: operacion.toString(),
		},
	};

	const completeURL = `/propiedades/detalle/${URL.tipoPropiedad}-${URL.estadoPublicacion}-${URL.localidad}-${URL.direccion}-${URL.codigo}?${new URLSearchParams(URL.query).toString()}`;

	return completeURL;
};
