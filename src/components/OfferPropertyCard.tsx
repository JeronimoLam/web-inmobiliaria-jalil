import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BedDouble, Bath, Grid2x2Plus } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { GetProperty } from "@/types/property.type";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

export interface OfferPropertyCardProps {
	property: GetProperty;
	onConsult?: () => void;
}

export function OfferPropertyCard({ property, onConsult }: OfferPropertyCardProps) {
	return (
		<Card className="w-full h-full flex flex-col">
			<Carousel className="min-h-[220px]">
				<CarouselContent>
					{property.images.map((image, index) => (
						<CarouselItem key={index} className="relative w-full h-[220px]">
							<Image src={image} alt={property.title} fill className="h-full w-full object-cover" />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>

			{/* Property Information */}
			<div className="p-[15px] pb-0">
				<div className="flex items-center justify-between">
					<p className="font-medium text-sm text-muted-foreground">
						{property.type} • {property.location}
					</p>
					<Badge variant="outline" className="">
						{property.code}
					</Badge>
				</div>

				<h3 className="text-lg font-semibold text-gray-900 mb-4">{property.title}</h3>

				{/* Property Details */}
				<div className="space-y-2 mb-3">
					<div className="flex items-center gap-2 text-gray-600">
						<BedDouble className="h-[22px] w-h-[22px] text-orange-500" />
						<span className="font-medium text-sm">Habitaciones</span>
						<span className="font-semibold text-sm">{property.bedrooms}</span>
					</div>

					<div className="flex items-center gap-2 text-gray-600">
						<Grid2x2Plus className="h-[22px] w-h-[22px] text-orange-500" />
						<span className="font-medium text-sm">Superficie cubierta</span>
						<span className="font-semibold text-sm">{property.area.toFixed(2)} m²</span>
					</div>

					<div className="flex items-center gap-2 text-gray-600">
						<Bath className="h-[22px] w-h-[22px] text-orange-500" />
						<span className="font-medium text-sm">Baños</span>
						<span className="font-semibold text-sm">{property.bathrooms}</span>
					</div>
				</div>
			</div>

			<Button
				onClick={onConsult}
				variant="secondary"
				className="w-full text-white px-4 py-9 rounded-none mt-auto justify-start"
			>
				<div className="flex flex-col text-start">
					{property.price && <span className="font-semibold text-lg">${property.price}</span>}
					{property.expense && (
						<span className="font-light text-sm">${property.expense} Expensas</span>
					)}
					{!property.price && !property.expense && (
						<span className="font-semibold text-lg">Consultar</span>
					)}
				</div>
			</Button>
		</Card>
	);
}
