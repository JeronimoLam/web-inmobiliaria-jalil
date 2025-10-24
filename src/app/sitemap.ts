import { MetadataRoute } from "next";

const appUrlProduction = process.env.NEXT_PUBLIC_APP_URL_PRODUCTION!;

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: appUrlProduction,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: `${appUrlProduction}/nosotros`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.5,
		},
		{
			url: `${appUrlProduction}/tasaciones`,
			lastModified: new Date(),
			changeFrequency: "never",
			priority: 0.5,
		},
		{
			url: `${appUrlProduction}/propiedades/alquiler`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${appUrlProduction}/propiedades/venta`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
	];
}
