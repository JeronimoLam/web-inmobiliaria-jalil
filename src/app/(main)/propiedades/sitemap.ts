import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";
import { getPropiedades } from "@/modules/propiedades/services/get-propiedades.service";
import { getPropiedadDetailUrl } from "@/modules/propiedades/utils/getPropiedadDetailUrl";
import type { MetadataRoute } from "next";

async function getAllPropiedades() {
	const [ventaRes, alquilerRes] = await Promise.all([
		getPropiedades({
			operacion: OperacionesEnum.VENTA,
		}),
		getPropiedades({
			operacion: OperacionesEnum.ALQUILER,
		}),
	]);

	const [propiedadesVenta, propiedadesAlquiler] = await Promise.all([
		ventaRes.data,
		alquilerRes.data,
	]);

	const propiedades = [...propiedadesVenta, ...propiedadesAlquiler];

	return propiedades;
}

export async function generateSitemaps() {
	const propiedades = await getAllPropiedades();
	const sitemapsCount = Math.ceil(propiedades.length / 50000);

	const idsArraySitemaps = Array.from({ length: sitemapsCount }, (_, i) => ({ id: i }));

	console.log(idsArraySitemaps);

	return idsArraySitemaps;
}

export default async function sitemap({ id = 0 }: { id?: number }): Promise<MetadataRoute.Sitemap> {
	const propiedades = await getAllPropiedades();

	const start = id * 50000;
	const end = start + 50000;
	const propiedadesSitemap = propiedades.slice(start, end);

	return propiedadesSitemap.map((propiedad) => {
		const slug = getPropiedadDetailUrl(propiedad);
		console.log(slug);
		return {
			url: `https://jalilpropiedades.com.ar${slug}`,
			lastModified: new Date(propiedad.updated_at),
			changeFrequency: "monthly",
			priority: 0.8,
		};
	});
}
