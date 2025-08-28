"use client";
import { PageContainer } from "@/components/layouts/PageContainer";
import { HomeHeroSlider } from "../components/HomeHeroSlider";
import { PropertySearchForm } from "../../../components/PropertySearchForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { OurBestOfferSection } from "../../../components/OurBestOfferSection";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";

interface HomeScreenProps {
	propertyTypes: { value: string; label: string }[];
	localities: { value: string; label: string }[];
	heroImages: string[];
	propiedades: Propiedad[];
}

export const HomeScreen = ({
	propertyTypes,
	localities,
	heroImages,
	propiedades,
}: HomeScreenProps) => {
	const [operation, setOperation] = useState<"venta" | "alquiler">("venta");

	const handleVentaSelect = () => setOperation("venta");
	const handleAlquilerSelect = () => setOperation("alquiler");

	const handleSearch = ({ propertyType, locality }: { propertyType: string; locality: string }) => {
		console.log({
			propertyType: propertyType || null,
			locality: locality || null,
			operation,
		});
	};

	return (
		<>
			<section id="home-hero" className="mt-[-70px] relative bg-black z-10">
				<HomeHeroSlider images={heroImages} slideDuration={5} />

				<div className="absolute top-0 h-full xl:h-1/2 w-full flex items-center xl:items-end justify-center text-white">
					<PageContainer>
						<div className="flex flex-col gap-7">
							<h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold w-fit">
								Encontramos tu lugar ideal
							</h1>
							<div className="flex flex-col gap-4">
								<div className="flex gap-2">
									<Button
										onClick={handleVentaSelect}
										variant={operation === "venta" ? "default" : "tertiary"}
										className="px-7 py-5 font-semibold"
									>
										Venta
									</Button>
									<Button
										onClick={handleAlquilerSelect}
										variant={operation === "alquiler" ? "default" : "tertiary"}
										className="px-7 py-5 font-semibold"
									>
										Alquiler
									</Button>
								</div>
								<div className="md:w-[650px]">
									<PropertySearchForm
										propertyTypes={propertyTypes}
										localities={localities}
										onSearch={handleSearch}
									/>
								</div>
							</div>
						</div>
					</PageContainer>
				</div>
			</section>
			<div className="pb-14">
				<OurBestOfferSection typeOffer="Venta" propiedades={propiedades} />
				<OurBestOfferSection typeOffer="Alquiler" propiedades={propiedades} />
			</div>
		</>
	);
};
