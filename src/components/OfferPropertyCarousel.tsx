"use client";
import { OfferPropertyCard } from "./OfferPropertyCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";

export const OfferPropertyCarousel = ({ propiedades }: { propiedades: Propiedad[] }) => {
	if (propiedades.length === 0) {
		return <p className="text-center">No hay propiedades disponibles.</p>;
	}
	return (
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
	);
};
