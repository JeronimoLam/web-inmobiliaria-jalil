import { PageContainer } from "@/components/layouts/PageContainer";
import { OfferPropertyCard } from "./OfferPropertyCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";

interface OurBestOfferProps {
	typeOffer: string;
	propiedades: Propiedad[];
}

export const OurBestOfferSection = ({ typeOffer, propiedades }: OurBestOfferProps) => {
	return (
		<section className="overflow-x-hidden">
			<div className="bg-muted-secondary">
				<PageContainer className="py-10">
					<h2 className="flex flex-col text-3xl font-light">
						Nuestra mejor oferta
						<span className="font-bold">{typeOffer}</span>
					</h2>
				</PageContainer>
			</div>
			<PageContainer className="py-8">
				<Carousel
					className="w-full relative"
					opts={{
						loop: true,
						watchDrag: false,
						slidesToScroll: 1,
						containScroll: "trimSnaps",
						align: "start",
					}}
				>
					<CarouselContent>
						{propiedades.map((propiedad) => (
							<CarouselItem
								key={propiedad.id}
								className="basis-full sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4 flex justify-center items-center"
							>
								<OfferPropertyCard
									key={propiedad.id}
									propiedad={propiedad}
									onConsult={() => console.log(`Consultar propiedad ${propiedad.codigo}`)}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="-left-6 sm:-left-6 md:-left-6 size-12 shadow-md" />
					<CarouselNext className="-right-6 sm:-right-6 md:-right-6 size-12 shadow-md" />
				</Carousel>
			</PageContainer>
		</section>
	);
};
