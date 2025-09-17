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
			operacion: "venta",
			filters: { destacadas: true },
		});
	} else {
		propiedades = await PropiedadesService.getAllPropiedades({
			operacion: "alquiler",
			filters: { destacadas: true },
		});
	}

	return <OfferPropertyCarousel propiedades={propiedades} />;
};
