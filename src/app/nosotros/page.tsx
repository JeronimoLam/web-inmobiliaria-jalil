import { NavBar } from "@/components/layouts/NavBar";
import { PageContainer } from "@/components/layouts/PageContainer";
import Image from "next/image";
// import { NosotrosScreen } from "@/modules/nosotros/screens/NosotrosScreen";

export default function Home() {
	return (
		<>
			<NavBar transparent />
			<main className="pt-[70px] relative">
				{/* <NosotrosScreen /> */}
				<div className="-mt-[70px] h-screen relative bg-secondary-dark z-10 flex flex-col md:block">
					<PageContainer className="relative md:absolute md:inset-0 flex items-center z-20 md:h-full">
						<div className="mt-[70px] md:mt-0 text-background w-full md:w-1/2 py-6 md:pr-4 sm:pr-8 space-y-4 md:space-y-6">
							<h1 className="text-4xl md:text-6xl font-bold">Nuestra Historia</h1>
							<p className="text-pretty text-sm lg:text-base">
								La Inmobiliaria Marcelo Jalil y Cia. comienza su actividad inmobiliaria en el año
								1971. Siendo una de las primeras inmobiliarias de importancia en la región. Hoy, con
								una trayectoria de más de 50 años, logró en la ciudad de La Plata que su nombre sea
								sinónimo de honestidad, seriedad y eficacia. Los martilleros al frente de nuestra
								inmobiliaria son Santiago Jalil y Jerónimo Jalil, siendo ellos ya tercera generación
								en esta actividad.
							</p>
						</div>
					</PageContainer>

					<picture className="md:absolute md:top-0 md:right-0 md:w-1/2 md:h-full block z-10">
						<Image
							src="/images/nosotros-hero.webp"
							alt="Descripción de la imagen"
							width={1280}
							height={850}
							className="w-full h-full object-cover"
						/>
					</picture>
				</div>

				<div className="h-screen relative bg-background z-10 flex flex-col md:block">
					<picture className="md:absolute md:top-0 md:left-0 md:w-1/2 md:h-full block z-10">
						<Image
							src="/images/nosotros-bg-2.webp"
							alt="Descripción de la imagen"
							width={1280}
							height={850}
							className="w-full h-full object-cover"
						/>
					</picture>
					<PageContainer className="relative md:absolute md:inset-0 flex items-center z-20 md:h-full">
						<div className="w-full md:w-1/2 md:ml-auto">
							<div className="mt-[70px] flex flex-col gap-5 md:mt-0 text-secondary py-6 md:pl-16 sm:pl-8 md:space-y-6">
								<h1 className="text-4xl md:text-6xl font-bold">En qué nos diferenciamos</h1>
								<p className="text-pretty text-sm lg:text-base">
									Somos una empresa familiar, tercera generación dedicada y especializada en el
									asesoramiento integral para operaciones de compraventa y alquiler de inmuebles
									brindándole al cliente seguridad y calidez en su trato personalizado.
								</p>
							</div>
						</div>
					</PageContainer>
				</div>
			</main>
		</>
	);
}
