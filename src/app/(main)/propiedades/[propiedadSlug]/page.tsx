import { Footer } from "@/components/layouts/Footer";
import { OurBestOfferSection } from "@/components/OurBestOfferSection";
import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";
import { PropiedadDetailScreen } from "@/modules/propiedades/screens/PropiedadDetailScreen";
import { PropiedadesService } from "@/modules/propiedades/services/propiedades.service";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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
	const propiedadId = parts[parts.length - 1];
	const op = operacion === "1" ? OperacionesEnum.ALQUILER : OperacionesEnum.VENTA;

	const propiedad = await PropiedadesService.getPropiedad(Number(propiedadId), op);

	if (!propiedad) return notFound();

	return (
		<>
			<PropiedadDetailScreen propiedad={propiedad} />
			<div className="pb-14">
				<Suspense fallback={<div>Cargando ofertas...</div>}>
					<OurBestOfferSection />
				</Suspense>
			</div>
			<Footer />
		</>
	);
}
