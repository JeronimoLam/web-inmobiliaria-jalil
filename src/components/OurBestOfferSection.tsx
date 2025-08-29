import { PageContainer } from "@/components/layouts/PageContainer";
import { OfferPropertyCarousel } from "./OfferPropertyCarousel";
import { PropiedadesService } from "@/modules/propiedades/services/propiedades.service";

export const OurBestOfferSection = async () => {
	//TODO: EN LUGAR DE PASAR POR PARAMETROS LAS PROPIEDADES PODEMOS HACER
	// QUE SE HAGA EL AWAIT AQUI MISMO TANTO PARA LAS PROPIEDADES DE VENTA
	// COMO PARA LAS DE ALQUILER Y ASI APROVECHAS EL STREAMING DE DATOS
	//TODO: TRATA DE HACER QUE EL SKELETON SEA DEL CAROUSEL Y NO DE TODAS LAS SECCIONESS

	const propiedadesVenta = await PropiedadesService.getPropiedadesVenta();
	const propiedadesAlquiler = await PropiedadesService.getPropiedadesAlquiler();

	return (
		<>
			<section className="overflow-x-hidden">
				<div className="bg-muted-secondary">
					<PageContainer className="py-10">
						<h2 className="flex flex-col text-3xl font-light">
							Nuestra mejor oferta
							<span className="font-bold">Venta</span>
						</h2>
					</PageContainer>
				</div>
				<PageContainer className="py-8">
					<OfferPropertyCarousel propiedades={propiedadesVenta} />
				</PageContainer>
			</section>
			<section className="overflow-x-hidden">
				<div className="bg-muted-secondary">
					<PageContainer className="py-10">
						<h2 className="flex flex-col text-3xl font-light">
							Nuestra mejor oferta
							<span className="font-bold">Alquiler</span>
						</h2>
					</PageContainer>
				</div>
				<PageContainer className="py-8">
					<OfferPropertyCarousel propiedades={propiedadesAlquiler} />
				</PageContainer>
			</section>
		</>
	);
};
