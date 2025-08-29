"use client";
import { PageContainer } from "@/components/layouts/PageContainer";
import { HomeHeroSlider } from "../components/HomeHeroSlider";
import { PropertySearchForm } from "../../../components/PropertySearchForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HomeScreenProps {
	tiposPropiedad: { value: string; label: string }[];
	localidades: { value: string; label: string }[];
	heroImages: string[];
}

interface handleSearchProps {
	tipoPropiedad: string | null;
	localidad: string | null;
}

export const HomeScreen = ({ tiposPropiedad, localidades, heroImages }: HomeScreenProps) => {
	const [operation, setOperation] = useState<"venta" | "alquiler">("venta");

	const handleVentaSelect = () => setOperation("venta");
	const handleAlquilerSelect = () => setOperation("alquiler");

	const handleSearch = ({ tipoPropiedad, localidad }: handleSearchProps) => {
		console.log({
			tipo_propiedad: tipoPropiedad || null,
			localidad: localidad || null,
			estado_publicacion: operation,
		});
	};

	return (
		<>
			<section id="home-hero" className="mt-[-70px] relative bg-black z-10">
				<HomeHeroSlider images={heroImages} slideDuration={5} />

				<div className="absolute top-0 h-full 2xl:h-1/2 w-full flex items-center 2xl:items-end justify-center text-white">
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
										tiposPropiedad={tiposPropiedad}
										localidades={localidades}
										onSearch={handleSearch}
									/>
								</div>
							</div>
						</div>
					</PageContainer>
				</div>
			</section>
		</>
	);
};
