import { PageContainer } from "@/components/layouts/PageContainer";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { PropiedadGalleryPreview } from "@/modules/propiedades/components/propiedad-detail/PropiedadGalleryPreview";
import { buildPropiedadTitle } from "@/modules/propiedades/utils/propiedadPropertyBuilder";
import { Separator } from "@/components/ui/separator";
import { PropiedadContactForm } from "@/modules/propiedades/components/propiedad-detail/PropiedadContactForm";
import { PropiedadDetails } from "@/modules/propiedades/components/propiedad-detail/PropiedadDetails";

interface PropiedadDetailScreenProps {
	propiedad: Propiedad;
}

export const PropiedadDetailScreen = ({ propiedad }: PropiedadDetailScreenProps) => {
	const precioImporte = propiedad.precios.length > 0 ? propiedad.precios[0].importe : "Consultar";
	const estadoPropiedad = propiedad.precios[0]?.estado_publicacion;
	const title = buildPropiedadTitle(propiedad);

	return (
		<div>
			<PropiedadGalleryPreview propiedad={propiedad} />

			<section className="py-6">
				<PageContainer>
					<div className="flex">
						<div className="w-[60%] flex flex-col gap-2 pr-10">
							<p className="flex gap-1 font-normal text-[#333333]">
								<span className="font-bold">{propiedad.tipo_propiedad.value}</span>
								<span>en</span>
								<span className="font-bold">{estadoPropiedad}</span>
								<span>•</span>
								<span className="font-bold">{propiedad.localidad.nombre}</span>
							</p>
							<h1 className="font-semibold text-3xl">{title}</h1>
						</div>
						<div className="w-[30%] flex flex-col justify-center">
							<p className="text-2xl font-bold text-secondary">
								{precioImporte === "Consultar"
									? "Consultar"
									: `${propiedad.precios[0].divisa} ${precioImporte.toLocaleString("es-AR")}`}
							</p>
							<p>Expensas: $00000</p>
						</div>
					</div>
					<Separator className="my-5" />
				</PageContainer>
				<PageContainer className="grid grid-cols-1 md:grid-cols-[60%_40%]">
					<div className="pr-10">
						<PropiedadDetails propiedad={propiedad} />
					</div>
					<div>
						<PropiedadContactForm />
					</div>
				</PageContainer>
				<PageContainer>
					<Separator className="my-8" />
				</PageContainer>
			</section>
		</div>
	);
};
