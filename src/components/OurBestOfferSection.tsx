import { PageContainer } from "@/components/layouts/PageContainer";
import { OfferPropertyCarouselServer } from "./server/OfferPropertyCarousel.server";
import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";
import { Suspense } from "react";
import { OfferPropertyCarouselSkeleton } from "./OfferPropertyCarouselSkeleton";

export const OurBestOfferSection = async () => {
	return (
		<>
			<section className="overflow-x-hidden">
				<div className="bg-muted-secondary">
					<PageContainer className="py-10">
						<h2 className="flex flex-col text-2.5xl font-light">
							Nuestra mejor oferta
							<span className="font-bold">Venta</span>
						</h2>
					</PageContainer>
				</div>
				<PageContainer className="py-4">
					<Suspense fallback={<OfferPropertyCarouselSkeleton />}>
						<OfferPropertyCarouselServer operacion={OperacionesEnum.VENTA} />
					</Suspense>
				</PageContainer>
			</section>
			<section className="overflow-x-hidden">
				<div className="bg-muted-secondary">
					<PageContainer className="py-10">
						<h2 className="flex flex-col text-2.5xl font-light">
							Nuestra mejor oferta
							<span className="font-bold">Alquiler</span>
						</h2>
					</PageContainer>
				</div>
				<PageContainer className="py-4">
					<Suspense fallback={<OfferPropertyCarouselSkeleton />}>
						<OfferPropertyCarouselServer operacion={OperacionesEnum.ALQUILER} />
					</Suspense>
				</PageContainer>
			</section>
		</>
	);
};
