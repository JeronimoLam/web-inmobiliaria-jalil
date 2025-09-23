import { NavBar } from "@/components/layouts/NavBar";
import { Check, Home, Key, Scale } from "lucide-react";
import Image from "next/image";

interface ServiceItem {
	text: string;
}

interface ServiceProps {
	icon: React.ReactNode;
	title: string;
	items: ServiceItem[];
}

function ServiceCard({ icon, title, items }: ServiceProps) {
	return (
		<div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-4 lg:gap-6">
			<div className="flex-shrink-0">
				<div className="w-14 h-14 lg:w-16 lg:h-16 border-2 border-primary rounded-lg flex items-center justify-center">
					{icon}
				</div>
			</div>
			<div className="flex-1 space-y-10">
				<h2 className="text-center lg:text-left text-xl lg:text-2xl font-bold mb-3">{title}</h2>
				<ul className="space-y-1.5 text-center lg:text-left text-sm lg:text-base">
					{items.map((item, index) => (
						<li key={index} className="flex items-center justify-center lg:justify-start gap-2">
							<Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
							<span>{item.text}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

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

				<section className="bg-secondary-dark">
					<div className="flex flex-col lg:flex-row h-full">
						<div className="w-full lg:w-1/2 px-4 flex items-center justify-center sm:px-8 xl:px-20 py-12 lg:py-20 flex-shrink-0">
							<div className="max-w-2xl text-white space-y-12 lg:space-y-20">
								<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center lg:text-left">
									Nuestros servicios
								</h1>

								<div className="space-y-16">
									<ServiceCard
										icon={<Key className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />}
										title="Alquileres"
										items={[
											{ text: "Mejor Renta de plaza" },
											{ text: "Financiación de gastos iniciales" },
											{ text: "Pago por giro o deposito bancario" },
											{ text: "Rápida respuesta a sus reclamos" },
											{ text: "Control y mantenimiento permanente." },
											{ text: "Personal especializado para todo tipo de reparaciones" },
										]}
									/>

									<ServiceCard
										icon={<Home className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />}
										title="Ventas"
										items={[
											{ text: "Tasación justa de mercado" },
											{ text: "Permuta y financiación" },
											{
												text: "Publicación de propiedades en los principales medios de comunicación, sin cargo y hasta la concreción de la operación.",
											},
											{ text: "Asesoramiento jurídico notarial" },
										]}
									/>

									<ServiceCard
										icon={<Scale className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />}
										title="Asesoramiento jurídico"
										items={[
											{
												text: "La Inmobiliaria Marcelo Jalli y cía. cuenta con el servicio del Estudio Jalli y asociados liderado por el Dr. Sergio Jalli con 30 años de trayectoria y gran reconocimiento nacional e internacional.",
											},
										]}
									/>
								</div>
							</div>
						</div>

						<div className="w-full lg:w-1/2 h-96 md:h-[500px] lg:h-full flex-grow">
							<Image
								src="https://th.bing.com/th/id/OIP.nTxG9T_2OJ-bIHxaJ4EGYgHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
								alt="Nuestros servicios"
								width={1280}
								height={850}
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
