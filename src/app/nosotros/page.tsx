import { NavBar } from "@/components/layouts/NavBar";
import Image from "next/image";

export default function NosotrosPage() {
	return (
		<>
			<NavBar transparent />
			<main>
				<section className="min-h-screen lg:h-screen bg-secondary-dark">
					<div className="flex flex-col lg:flex-row h-full min-h-screen lg:h-screen">
						<div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 xl:px-20 py-16 pt-30 flex-shrink-0">
							<div className="max-w-2xl text-background space-y-6">
								<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center lg:text-left">
									Nuestra Historia
								</h1>
								<p className="text-pretty text-sm md:text-base lg:text-lg text-center lg:text-left leading-relaxed">
									La Inmobiliaria Marcelo Jalil y Cia. comienza su actividad inmobiliaria en el año
									1971. Siendo una de las primeras inmobiliarias de importancia en la región. Hoy,
									con una trayectoria de más de 50 años, logró en la ciudad de La Plata que su
									nombre sea sinónimo de honestidad, seriedad y eficacia. Los martilleros al frente
									de nuestra inmobiliaria son Santiago Jalil y Jerónimo Jalil, siendo ellos ya
									tercera generación en esta actividad.
								</p>
							</div>
						</div>

						<div className="w-full lg:w-1/2 h-96 md:h-[500px] lg:h-full flex-grow">
							<Image
								src="/images/nosotros-hero.webp"
								alt="Historia de la inmobiliaria"
								width={1280}
								height={850}
								className="w-full h-full object-cover"
								priority
							/>
						</div>
					</div>
				</section>

				<section className="min-h-screen lg:h-screen bg-background">
					<div className="flex flex-col lg:flex-row h-full min-h-screen lg:h-screen">
						{/* Imagen - mitad izquierda */}
						<div className="w-full lg:w-1/2 h-96 md:h-[500px] lg:h-full order-2 lg:order-1 flex-grow">
							<Image
								src="/images/nosotros-bg-2.webp"
								alt="Diferenciación de la inmobiliaria"
								width={1280}
								height={850}
								className="w-full h-full object-cover"
							/>
						</div>

						<div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 xl:px-20 py-20 order-1 lg:order-2 flex-shrink-0">
							<div className="max-w-2xl text-secondary space-y-6">
								<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center lg:text-left">
									En qué nos diferenciamos
								</h1>
								<p className="text-pretty text-sm md:text-base lg:text-lg text-center lg:text-left leading-relaxed">
									Somos una empresa familiar, tercera generación dedicada y especializada en el
									asesoramiento integral para operaciones de compraventa y alquiler de inmuebles
									brindándole al cliente seguridad y calidez en su trato personalizado.
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
