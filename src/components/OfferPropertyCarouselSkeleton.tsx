import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

export const OfferPropertyCarouselSkeleton = () => {
	return (
		<Carousel className="w-full relative">
			<CarouselContent>
				{Array.from({ length: 4 }).map((_, idx) => (
					<CarouselItem
						key={idx}
						className="basis-full sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4 flex justify-center items-center"
					>
						<Card className="w-full h-full flex flex-col">
							{/* Imagen Carousel */}
							<Skeleton className="w-full min-h-[220px] rounded-t-xl rounded-b-none mb-0 bg-muted-foreground/30" />

							{/* Info */}
							<div className="p-[15px] pb-0 flex flex-col gap-2">
								<div className="flex items-center justify-between">
									<Skeleton className="h-4 w-24 bg-muted-foreground/30" />{" "}
									{/* Tipo propiedad y localidad */}
									<Skeleton className="h-5 w-12 rounded bg-muted-foreground/30" />{" "}
									{/* Badge código */}
								</div>
								<Skeleton className="h-6 w-3/4 mb-4 bg-muted-foreground/30" /> {/* Título */}
								<div className="space-y-2 mb-3">
									<div className="flex items-center gap-2">
										<Skeleton className="h-[22px] w-[22px] rounded-full bg-muted-foreground/30" />{" "}
										{/* Icono */}
										<Skeleton className="h-4 w-20 bg-muted-foreground/30" />
										<Skeleton className="h-4 w-8 bg-muted-foreground/10" />
									</div>
									<div className="flex items-center gap-2">
										<Skeleton className="h-[22px] w-[22px] rounded-full bg-muted-foreground/30" />{" "}
										{/* Icono */}
										<Skeleton className="h-4 w-28 bg-muted-foreground/30" />
										<Skeleton className="h-4 w-12 bg-muted-foreground/10" />
									</div>
									<div className="flex items-center gap-2">
										<Skeleton className="h-[22px] w-[22px] rounded-full bg-muted-foreground/30" />{" "}
										{/* Icono */}
										<Skeleton className="h-4 w-16 bg-muted-foreground/30" />
										<Skeleton className="h-4 w-8 bg-muted-foreground/10" />
									</div>
								</div>
							</div>

							{/* Botón precio */}
							<Skeleton className="w-full px-4 py-9 rounded-none mt-auto justify-start bg-muted-foreground/30" />
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			{/* Botones de navegación */}
			<div className="absolute -left-6 top-1/2 -translate-y-1/2">
				<Skeleton className="size-12 shadow-md bg-muted-foreground/30 rounded-full" />
			</div>
			<div className="absolute -right-6 top-1/2 -translate-y-1/2">
				<Skeleton className="size-12 shadow-md bg-muted-foreground/30 rounded-full" />
			</div>
		</Carousel>
	);
};
