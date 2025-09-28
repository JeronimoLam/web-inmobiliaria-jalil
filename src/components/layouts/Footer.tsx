"use client";
import { PageContainer } from "./PageContainer";
import { Logo } from "../Logo";
import Link from "next/link";
import { MapPinIcon, PhoneIcon, MailIcon, Clock3Icon, FacebookIcon } from "@/components/Icons";
import { usePathname } from "next/navigation";

const TextWithIcon = ({
	icon: Icon,
	iconWidth = 20,
	iconHeight = 20,
	children,
}: {
	icon: React.ElementType;
	children: React.ReactNode;
	iconWidth?: number;
	iconHeight?: number;
}) => (
	<div className="flex flex-wrap gap-2">
		<Icon width={iconWidth} height={iconHeight} />
		<p className="text-sm">{children}</p>
	</div>
);

export const Footer = () => {
	const pathname = usePathname();
	const hideFooter = pathname.startsWith("/admin");
	if (hideFooter) return null;

	return (
		<footer className="bg-secondary-dark text-secondary-foreground">
			<PageContainer className="p-4 py-6 lg:pt-10">
				<div className="md:flex md:items-start md:justify-between pb-5 xs:py-5 md:pb-10 gap-10">
					<div className="mb-6 md:mb-0 flex flex-col gap-5">
						<Logo className="w-28 md:w-32" />

						<div className="font-light text-sm flex flex-col gap-3 text-gray-400">
							<p className="text-pretty">
								Santiago Andrés Jalil - Martillero y Corredor Público <br />
								Coleg. 7388
							</p>
							<p className="text-pretty">
								Jerónimo Jalil - Martillero y Corredor Público <br />
								Coleg. 7562
							</p>
						</div>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
						<div>
							<h2 className="text-primary mb-6 text-xl font-semibold uppercase">Visitanos</h2>
							<ul className="flex flex-col gap-5 text-gray-300 font-light">
								<li>
									<Link
										href="https://maps.app.goo.gl/HNvhhqchJP2yviaC7"
										target="_blank"
										rel="noopener noreferrer"
										className="hover:underline"
									>
										<TextWithIcon icon={MapPinIcon}>
											Calle 10 Nº665 e/45 y 46 <br /> (1900) La Plata <br /> Buenos Aires, Argentina
										</TextWithIcon>
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h2 className="text-primary mb-6 text-xl font-semibold uppercase">Llamanos</h2>
							<ul className="flex flex-col gap-5 text-gray-300 font-light">
								<li>
									<Link href="tel:02214217393" className="hover:underline">
										<TextWithIcon icon={PhoneIcon}>(0221) 421-7393</TextWithIcon>
									</Link>
								</li>
								<li>
									<Link href="tel:02214215498" className="hover:underline">
										<TextWithIcon icon={PhoneIcon}>(0221) 421-5498</TextWithIcon>
									</Link>
								</li>
								<li className="break-all">
									<Link href="mailto:info@jalilpropiedades.com.ar" className="hover:underline">
										<TextWithIcon icon={MailIcon}>info@jalilpropiedades.com.ar</TextWithIcon>
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h2 className="text-primary mb-6 text-xl font-semibold uppercase">Seguinos</h2>
							<ul className="flex flex-col gap-5 text-gray-300 font-light">
								<li>
									<Link
										href="https://www.facebook.com/JalilPropiedades/"
										target="_blank"
										className="hover:underline"
									>
										<TextWithIcon icon={FacebookIcon}>Facebook</TextWithIcon>
									</Link>
								</li>
								<li>
									<TextWithIcon icon={Clock3Icon}>
										<span className="flex flex-col">
											<span>Lunes a Viernes de 9:00 a 17:00 hs</span>
											<span>Sábados de 9:30 a 12:30 hs</span>
										</span>
									</TextWithIcon>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<hr className="my-6 border-[#DFDFDF]/20 sm:mx-auto lg:my-6" />
				<div className="flex items-center justify-center">
					<span className="text-sm text-gray-500 sm:text-center">
						© {new Date().getFullYear()} Jalil Propiedades . Todos los derechos reservados.
					</span>
				</div>
			</PageContainer>
		</footer>
	);
};
