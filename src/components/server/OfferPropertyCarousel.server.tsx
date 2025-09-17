import { PropiedadesService } from "@/modules/propiedades/services/propiedades.service";
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
		propiedades = await PropiedadesService.getAllPropiedades({
			operacion: OperacionesEnum.VENTA,
			filters: { destacadas: true },
		});
	} else {
		propiedades = await PropiedadesService.getAllPropiedades({
			operacion: OperacionesEnum.ALQUILER,
			filters: { destacadas: true },
		});
	}

	return <OfferPropertyCarousel propiedades={propiedades} />;
};
