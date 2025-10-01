import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";
import { CreatePropiedad } from "../types/create-propiedad.types";

export const usePrecios = (
	precios: CreatePropiedad["precios"],
	appendPrecio: (value: {
		estado_publicacion_id: number;
		importe: number | undefined;
		divisa: string;
	}) => void,
) => {
	const handleAgregarPrecioAlquiler = () => {
		const tieneAlquiler = precios.some((p) => p.estado_publicacion_id === OperacionesEnum.ALQUILER);
		if (tieneAlquiler) return;

		appendPrecio({
			estado_publicacion_id: OperacionesEnum.ALQUILER,
			importe: undefined,
			divisa: "ARS",
		});
	};

	const handleAgregarPrecioVenta = () => {
		const tieneVenta = precios.some((p) => p.estado_publicacion_id === OperacionesEnum.VENTA);
		if (tieneVenta) return;

		appendPrecio({
			estado_publicacion_id: OperacionesEnum.VENTA,
			importe: undefined,
			divisa: "USD",
		});
	};

	const canAddAlquiler = !precios.some((p) => p.estado_publicacion_id === OperacionesEnum.ALQUILER);
	const canAddVenta = !precios.some((p) => p.estado_publicacion_id === OperacionesEnum.VENTA);

	return {
		handleAgregarPrecioAlquiler,
		handleAgregarPrecioVenta,
		canAddAlquiler,
		canAddVenta,
	};
};
