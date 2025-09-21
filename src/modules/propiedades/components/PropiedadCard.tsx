import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BedDouble, Bath, Grid2x2Plus } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import Link from "next/link";
import { getPropiedadDetailUrl } from "@/modules/propiedades/utils/getPropiedadDetailUrl";
import { buildPropiedadTitle } from "@/modules/propiedades/utils/propiedadPropertyBuilder";
import { getCardImagesToShow } from "../utils/getCardImagesToShow";

export interface OfferPropertyCardProps {
	propiedad: Propiedad;
	onConsult?: () => void;
}

export function PropiedadCard({ propiedad, onConsult }: OfferPropertyCardProps) {
	const title = buildPropiedadTitle(propiedad);
	const propiedadDetailUrl = getPropiedadDetailUrl(propiedad);
	const imagesToShow = getCardImagesToShow(propiedad.imagenes);

	return (
		<Card className="w-full md:h-[280px] flex md:flex-row hover:shadow-lg transition-shadow duration-300 group">
			<Carousel
				className="min-h-[220px] md:min-w-[380px] md:h-full"
				opts={{
					loop: true,
				}}
			>
				<Link href={propiedadDetailUrl}>
					<CarouselContent>
						{imagesToShow.map((imagen, index) => (
							<CarouselItem key={index} className="relative w-full h-[220px] md:h-[280px]">
								<Image
									src={imagen.url}
									alt={propiedad.descripcion}
									fill
									sizes="(max-width: 768px) 100vw, 100vw"
									className="object-cover"
								/>
							</CarouselItem>
						))}
					</CarouselContent>
				</Link>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>

			<Link href={propiedadDetailUrl} className="flex flex-col w-full h-full">
				{/* Property Information */}
				<div className="p-[15px] pb-0 flex-1">
					<div className="flex items-center justify-between">
						<p className="font-medium text-sm text-muted-foreground">
							{propiedad.tipo_propiedad.value} • {propiedad.localidad.nombre}
						</p>
						<Badge variant="outline" className="">
							{propiedad.codigo}
						</Badge>
					</div>

					<h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>

					{/* Property Details */}
					<div className="space-y-2 mb-3">
						<div className="flex items-center gap-2 text-gray-600">
							<BedDouble className="h-[22px] w-h-[22px] text-orange-500" />
							<span className="font-medium text-sm">Habitaciones</span>
							<span className="font-semibold text-sm">{propiedad.detalles.dormitorios}</span>
						</div>

						<div className="flex items-center gap-2 text-gray-600">
							<Grid2x2Plus className="h-[22px] w-h-[22px] text-orange-500" />
							<span className="font-medium text-sm">Superficie cubierta</span>
							<span className="font-semibold text-sm">
								{propiedad.detalles.superficie_cubierta?.toFixed(2)} m²
							</span>
						</div>

						<div className="flex items-center gap-2 text-gray-600">
							<Bath className="h-[22px] w-h-[22px] text-orange-500" />
							<span className="font-medium text-sm">Baños</span>
							<span className="font-semibold text-sm">{propiedad.detalles.banos}</span>
						</div>
					</div>
				</div>

				<Button
					onClick={onConsult}
					variant="secondary"
					className="w-full text-white px-4 py-9 rounded-none justify-start transition group-hover:bg-secondary-dark"
				>
					<div className="flex flex-col text-start">
						<PropiedadPrecios propiedad={propiedad} />
					</div>
				</Button>
			</Link>
		</Card>
	);
}

const PropiedadPrecios = ({ propiedad }: { propiedad: Propiedad }) => {
	const precio = propiedad.precios[0];

	if (precio.importe === 0) {
		return <span className="font-semibold text-lg">Consultar</span>;
	}

	return (
		<div className="flex gap-1 items-center">
			{precio.importe === 0 && <span className="font-semibold text-lg">Consultar</span>}
			{precio.importe && precio.divisa && (
				<>
					<span className="font-semibold text-xl">${precio.importe.toLocaleString("es-AR")}</span>
					<span className="font-light text-xl">{precio.divisa}</span>
				</>
			)}
		</div>
	);
};
