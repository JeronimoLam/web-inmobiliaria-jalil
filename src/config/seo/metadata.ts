import type { Metadata } from "next";

export const globalMetadata: Metadata = {
	title: {
		default: "Jalil Propiedades - Inmobiliaria en La Plata | Venta y Alquiler",
		template: "%s | Jalil Propiedades",
	},
	description:
		"Encontrá propiedades en venta y alquiler en La Plata y alrededores. Casas, departamentos, oficinas, locales y terrenos.",
	keywords: [
		"inmobiliaria La Plata",
		"propiedades en La Plata",
		"inmobiliaria en La Plata",
		"inmobiliarias en La Plata",
		"casas en venta La Plata",
		"departamentos en alquiler La Plata",
		"inmuebles La Plata",
		"venta propiedades La Plata",
		"alquiler propiedades La Plata",
		"locales comerciales La Plata",
		"terrenos La Plata",
		"tasaciones inmobiliarias La Plata",
		"inmobiliaria Buenos Aires",
		"propiedades destacadas La Plata",
		"búsqueda propiedades La Plata",
		"inmobiliaria confiable La Plata",
		"asesoramiento inmobiliario La Plata",
	],
	authors: [{ name: "Jalil Propiedades" }],
	metadataBase: new URL("https://jalilpropiedades.com"),
	alternates: {
		canonical: "/",
		languages: { "es-AR": "/" },
	},
	openGraph: {
		type: "website",
		locale: "es_AR",
		siteName: "Jalil Propiedades",
		title: "Jalil Propiedades - Inmobiliaria en La Plata | Venta y Alquiler",
		description:
			"Encontrá propiedades en venta y alquiler en La Plata y alrededores. Experiencia, transparencia y atención personalizada.",
		url: "https://jalilpropiedades.com",
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
		title: "Jalil Propiedades - Inmobiliaria en La Plata",
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
	verification: {
		google: "google-site-verification-code", // Cambiar al código real
	},
	icons: {
		icon: [{ url: "/images/logo.webp", sizes: "any" }],
		apple: [{ url: "/images/logo.webp", sizes: "336x206" }],
	},
	appleWebApp: {
		title: "Jalil Propiedades",
		capable: true,
		statusBarStyle: "default",
	},
	viewport: {
		width: "device-width",
		initialScale: 1,
	},
};
