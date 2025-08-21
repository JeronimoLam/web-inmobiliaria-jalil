"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Bed, Bath, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { GetProperty } from "@/types/property.type";

export interface OfferPropertyCardProps {
	property: GetProperty;
	onConsult?: () => void;
}

export function OfferPropertyCard({ property, onConsult }: OfferPropertyCardProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
	};

	const prevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
	};

	return (
		<Card className="w-full max-w-sm h-full flex flex-col">
			{/* Image Carousel */}
			<div className="relative flex-1 overflow-hidden min-h-[200px]">
				{/* <img
					src={images[currentImageIndex] || "/placeholder.svg"}
					alt={title}
					className="h-full w-full object-cover"
				/> */}
				<Image
					src={property.images[currentImageIndex] || "/placeholder.svg"}
					alt={property.title}
					className="h-full w-full object-cover"
					fill
				/>

				{/* Navigation Arrows */}
				{property.images.length > 1 && (
					<>
						<button
							onClick={prevImage}
							className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
						>
							<ChevronLeft className="h-4 w-4" />
						</button>
						<button
							onClick={nextImage}
							className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
						>
							<ChevronRight className="h-4 w-4" />
						</button>
					</>
				)}

				{/* Image Indicators */}
				{property.images.length > 1 && (
					<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
						{property.images.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentImageIndex(index)}
								className={cn(
									"h-2 w-2 rounded-full transition-colors",
									index === currentImageIndex ? "bg-white" : "bg-white/50",
								)}
							/>
						))}
					</div>
				)}
			</div>

			{/* Property Information */}
			<div className="p-[15px] pb-0">
				<div className="flex items-center justify-between">
					<p className="font-medium text-sm text-muted-foreground">
						{property.type} • {property.location}
					</p>
					{/* <div className="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-800">
						{property.code}
					</div> */}
					<Badge variant="outline" className="">
						{property.code}
					</Badge>
				</div>

				{/* Title */}
				<h3 className="text-lg font-semibold text-gray-900 mb-4">{property.title}</h3>

				{/* Property Details */}
				<div className="space-y-2 mb-3">
					<div className="flex items-center gap-2 text-gray-600">
						<Bed className="h-[22px] w-h-[22px] text-orange-500" />
						<span className="font-medium text-sm">Habitaciones</span>
						<span className="font-semibold text-sm">{property.bedrooms}</span>
					</div>

					<div className="flex items-center gap-2 text-gray-600">
						<Square className="h-[22px] w-h-[22px] text-orange-500" />
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
				className="w-full text-white px-4 py-8 rounded-none mt-auto justify-start"
			>
				<div className="flex flex-col text-start">
					<span className="font-medium text-lg">Consultar</span>
					<span className="font-light text-sm">$valor expensas</span>
				</div>
			</Button>
		</Card>
	);
}
