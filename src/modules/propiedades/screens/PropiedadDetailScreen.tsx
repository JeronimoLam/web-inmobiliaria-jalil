import { PageContainer } from "@/components/layouts/PageContainer";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { PropiedadGalleryPreview } from "@/modules/propiedades/components/propiedad-detail/PropiedadGalleryPreview";
import { buildPropiedadTitle } from "@/modules/propiedades/utils/propiedadPropertyBuilder";
import { Separator } from "@/components/ui/separator";
import { PropiedadContactForm } from "@/modules/propiedades/components/propiedad-detail/PropiedadContactForm";
import { PropiedadDetails } from "@/modules/propiedades/components/propiedad-detail/PropiedadDetails";
import { MapPinIcon } from "@/components/Icons";
import { PropiedadMap } from "@/modules/propiedades/components/propiedad-detail/PropiedadMap";

interface PropiedadDetailScreenProps {
	propiedad: Propiedad;
}

export const PropiedadDetailScreen = ({ propiedad }: PropiedadDetailScreenProps) => {
	const precioImporte = propiedad.precios.length > 0 ? propiedad.precios[0].importe : "Consultar";
	const estadoPropiedad = propiedad.precios[0]?.estado_publicacion;
	const title = buildPropiedadTitle(propiedad);
	const [latitud, longitud] = propiedad.map_location.coordinates;

	return (
		<div>
			<PropiedadGalleryPreview propiedad={propiedad} />

			<section className="py-6">
				<PageContainer>
					<div className="flex flex-col lg:flex-row gap-3 lg:gap-0">
						<div className="lg:w-[60%] flex flex-col gap-2 lg:pr-10">
							<p className="flex gap-1 font-normal text-[#333333]">
								<span className="font-bold">{propiedad.tipo_propiedad.value}</span>
								<span>en</span>
								<span className="font-bold">{estadoPropiedad}</span>
								<span>•</span>
								<span className="font-bold">{propiedad.localidad.nombre}</span>
							</p>
							<h1 className="font-semibold text-2.5xl">{title}</h1>
						</div>
						<div className="lg:w-[30%] flex flex-col justify-center">
							<p className="text-2.5xl font-bold text-secondary">
								{precioImporte === "Consultar"
									? "Consultar"
									: `${propiedad.precios[0].divisa} ${precioImporte.toLocaleString("es-AR")}`}
							</p>
							<p className="text-md font-medium">Expensas: $00000</p>
						</div>
					</div>
					<Separator className="my-5" />
				</PageContainer>
				<PageContainer className="relative grid grid-cols-1 lg:grid-cols-[60%_40%] gap-3 lg:gap-0">
					<div className="lg:pr-10">
						<PropiedadDetails propiedad={propiedad} />
					</div>
					<div>
						<PropiedadContactForm />
					</div>
				</PageContainer>
				<PageContainer>
					<Separator className="my-8" />
					<div className="flex flex-col gap-4">
						<h2 className="flex flex-col sm:flex-row gap-2 sm:items-center font-semibold text-xl">
							<span className="flex gap-1">
								<MapPinIcon height={26} width={26} />
								Ubicación
							</span>
							<span className="hidden sm:block">•</span>
							<span className="font-normal">{title}</span>
						</h2>
						<PropiedadMap latitud={latitud} longitud={longitud} />
					</div>
				</PageContainer>
			</section>
		</div>
	);
};
