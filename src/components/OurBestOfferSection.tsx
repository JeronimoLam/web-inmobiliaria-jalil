import { PageContainer } from "@/components/layouts/PageContainer";
import { OfferPropertyCard } from "./OfferPropertyCard";
import { GetProperty } from "@/types/property.type";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

interface OurBestOfferProps {
	typeOffer: string;
	properties: GetProperty[];
}

export const OurBestOfferSection = ({ typeOffer, properties }: OurBestOfferProps) => {
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
						loop: false,
						watchDrag: false,
						slidesToScroll: 1,
						containScroll: "trimSnaps",
						align: "start",
					}}
				>
					<CarouselContent>
						{properties.map((property) => (
							<CarouselItem
								key={property.code}
								className="basis-full sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4 flex justify-center items-center"
							>
								<OfferPropertyCard
									key={property.code}
									property={property}
									onConsult={() => console.log(`Consultar propiedad ${property.code}`)}
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
