import { Propiedad } from "../types/propiedad.type";

export const buildPropiedadTitle = (propiedad: Propiedad) => {
	const calle = propiedad.calle;
	const numero = propiedad.numero;
	const entreCalles = propiedad.entre_calles ? `entre ${propiedad.entre_calles}` : "";

	const title = `${calle} N°${numero} ${entreCalles}`;
	return title;
};
