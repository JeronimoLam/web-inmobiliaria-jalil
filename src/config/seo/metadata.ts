import type { Metadata } from "next";

export const globalMetadata: Metadata = {
	title: {
		default: "Propiedades en Venta y Alquiler en La Plata | Jalil Propiedades",
		template: "%s | Jalil Propiedades",
	},
	description:
		"Encontrá propiedades en venta y alquiler en La Plata y alrededores. Casas, departamentos, oficinas, locales y terrenos.",
	keywords: [
		"inmobiliaria",
		"propiedades en venta",
		"alquiler de propiedades",
		"casas y departamentos",
		"inmuebles comerciales",
		"terrenos",
		"tasaciones inmobiliarias",
		"inmobiliaria confiable",
		"asesoramiento inmobiliario",
	],
	authors: [{ name: "Jalil Propiedades" }],
	metadataBase: new URL("https://jalilpropiedades.com.ar"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		locale: "es_AR",
		siteName: "Jalil Propiedades",
		title: "Propiedades en Venta y Alquiler en La Plata | Jalil Propiedades",
		description:
			"Encontrá propiedades en venta y alquiler en La Plata y alrededores. Experiencia, transparencia y atención personalizada.",
		url: "https://jalilpropiedades.com.ar",
		images: [
			{
				url: "/images/logo.webp",
				width: 336,
				height: 206,
				alt: "Jalil Propiedades - Inmobiliaria en La Plata",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Propiedades en Venta y Alquiler en La Plata | Jalil Propiedades",
		description: "Encontrá propiedades en venta y alquiler en La Plata y alrededores.",
		images: ["/images/logo.webp"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
	icons: {
		icon: [{ url: "/images/logo.webp", sizes: "32x32", type: "image/webp" }],
		apple: [{ url: "/images/logo.webp", sizes: "180x180", type: "image/webp" }],
	},
	appleWebApp: {
		title: "Propiedades en Venta y Alquiler en La Plata | Jalil Propiedades",
		capable: true,
		statusBarStyle: "default",
	},
	viewport: {
		width: "device-width",
		initialScale: 1,
	},
};

export const nosotrosMetadata: Metadata = {
	title: "Sobre Nosotros | Jalil Propiedades",
	description: "Conoce a la inmobiliaria Jalil Propiedades y nuestros valores.",
	keywords: ["nosotros", "historia", "misión", "visión", "valores"],
	alternates: {
		canonical: "/nosotros",
	},
};

export const tasacionesMetadata: Metadata = {
	title: "Tasaciones | Jalil Propiedades",
	description: "Tasaciones inmobiliarias en La Plata y alrededores.",
	keywords: ["tasaciones", "inmobiliarias", "La Plata", "alrededores"],
	alternates: {
		canonical: "/tasaciones",
	},
};

interface PageProps {
	params: Promise<{ operacion: string }>;
	searchParams?: Promise<Record<string, string | undefined>>;
}

export async function generatePropiedadesMetadata({
	params,
	searchParams,
}: PageProps): Promise<Metadata> {
	const { operacion } = await params;
	const queryParams = searchParams ? await searchParams : {};
	if (operacion !== "venta" && operacion !== "alquiler") return { title: "Propiedades" };

	const tipoPropiedad = queryParams?.tipoPropiedad
		? `${queryParams.tipoPropiedad.charAt(0).toUpperCase() + queryParams.tipoPropiedad.slice(1)}`
		: "Propiedades";

	const localidad = queryParams?.localidad
		? `| ${queryParams.localidad.charAt(0).toUpperCase() + queryParams.localidad.slice(1)}`
		: "";

	return {
		title: `${tipoPropiedad} en ${operacion} ${localidad}`,
		description: `${tipoPropiedad} para ${operacion} en ${localidad} disponibles en Jalil Propiedades.`,
		keywords: [
			`${tipoPropiedad.toLowerCase()}`,
			`${operacion}`,
			`${localidad.toLowerCase()}`,
			"inmobiliaria",
		],
		alternates: { canonical: `/propiedades/${operacion}` },
	};
}
