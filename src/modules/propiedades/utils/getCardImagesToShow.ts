import { Imagen } from "../types/propiedad.type";

export const getCardImagesToShow = (imagenes: Imagen[]) => {
	const principal = imagenes.find((img) => img.principal);
	let imagesToShow: Imagen[] = [];
	if (principal) {
		const notPrincipal = imagenes.filter((img) => !img.principal);
		imagesToShow = [principal, ...notPrincipal.slice(0, 3)];
	} else {
		imagesToShow = imagenes.slice(0, 3);
	}
	return imagesToShow;
};
