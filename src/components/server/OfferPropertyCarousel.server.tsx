import { getPropiedades } from "@/modules/propiedades/services/get-propiedades.service";
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
		propiedades = await getPropiedades({
			operacion: OperacionesEnum.VENTA,
			filters: { destacadas: true },
		});
	} else {
		propiedades = await getPropiedades({
			operacion: OperacionesEnum.ALQUILER,
			filters: { destacadas: true },
		});
	}

	return <OfferPropertyCarousel propiedades={propiedades.data} />;
};
