import { Propiedad } from "../types/propiedad.type";

export const buildPropiedadTitle = (propiedad: Propiedad) => {
	const calle = propiedad.calle;
	const numero = propiedad.numero;
	const entreCalles = propiedad.entre_calles ? `entre ${propiedad.entre_calles}` : "";

	const title = `${calle} N°${numero} ${entreCalles}`;
	return title;
};

export const buildPropiedadEstado = (propiedad: Propiedad) => {
	const estado = propiedad.precios[0]?.estado_publicacion;

	return estado;
};
