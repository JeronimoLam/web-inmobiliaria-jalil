import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://jalilpropiedades.com.ar",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: "https://jalilpropiedades.com.ar/nosotros",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.5,
		},
		{
			url: "https://jalilpropiedades.com.ar/tasaciones",
			lastModified: new Date(),
			changeFrequency: "never",
			priority: 0.5,
		},
		{
			url: "https://jalilpropiedades.com.ar/propiedades/alquiler",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: "https://jalilpropiedades.com.ar/propiedades/venta",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
	];
}
