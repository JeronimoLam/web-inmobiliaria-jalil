import { Footer } from "@/components/layouts/Footer";
import { OurBestOfferSection } from "@/components/OurBestOfferSection";
import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";
import { PropiedadDetailScreen } from "@/modules/propiedades/screens/PropiedadDetailScreen";
import { PropiedadesService } from "@/modules/propiedades/services/propiedades-mock.service";
import { notFound } from "next/navigation";

interface PropiedadDetailPageProps {
	params: Promise<{
		propiedadSlug: string;
	}>;
	searchParams: Promise<{
		operacion: string;
	}>;
}

export default async function PropiedadDetailPage({
	params,
	searchParams,
}: PropiedadDetailPageProps) {
	const { propiedadSlug } = await params;
	const { operacion } = await searchParams;

	const parts = propiedadSlug.split("-");
	const codigoPropiedad = parts[parts.length - 1];
	const op = operacion === "1" ? OperacionesEnum.ALQUILER : OperacionesEnum.VENTA;

	const propiedad = await PropiedadesService.getPropiedad(Number(codigoPropiedad), op);

	if (!propiedad) return notFound();

	return (
		<>
			<PropiedadDetailScreen propiedad={propiedad} />
			<div className="pb-14">
				<OurBestOfferSection />
			</div>
			<Footer />
		</>
	);
}
