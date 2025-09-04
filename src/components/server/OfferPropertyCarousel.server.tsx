import { PropiedadesService } from "@/modules/propiedades/services/propiedades-mock.service";
import { OfferPropertyCarousel } from "../OfferPropertyCarousel";
import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";

interface OfferPropertyCarouselServerProps {
	operacion: OperacionesEnum;
}

export const OfferPropertyCarouselServer = async ({
	operacion,
}: OfferPropertyCarouselServerProps) => {
	let propiedades;
	if (operacion === OperacionesEnum.VENTA) {
		propiedades = await PropiedadesService.getPropiedadesVenta();
	} else {
		propiedades = await PropiedadesService.getPropiedadesAlquiler();
	}

	return <OfferPropertyCarousel propiedades={propiedades} />;
};
