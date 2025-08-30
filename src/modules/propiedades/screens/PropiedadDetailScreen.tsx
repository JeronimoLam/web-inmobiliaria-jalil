import { PageContainer } from "@/components/layouts/PageContainer";
import { Propiedad } from "../types/propiedad.type";
import { PropiedadGalleryPreview } from "../components/propiedad-detail/PropiedadGalleryPreview";
import { Card } from "@/components/ui/card";
import { buildPropiedadTitle } from "../utils/propiedadPropertyBuilder";
import { BathIcon, BedDoubleIcon, Grid2x2PlusIcon } from "@/components/Icons";
import { Separator } from "@/components/ui/separator";
import { PropiedadDetailsTab } from "../components/propiedad-detail/PropiedadDetailsTab";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
					<div className="flex gap-4">
						<div className="w-[60%] flex flex-col gap-2">
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
					<Separator className="my-4" />
				</PageContainer>
				<PageContainer className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-6">
					<div>
						<div>
							<div className="space-y-2 mb-3">
								<div className="flex items-center gap-2 text-gray-600">
									<BedDoubleIcon className="h-[22px] w-h-[22px] text-orange-500" />
									<span className="font-medium text-sm">Habitaciones</span>
									<span className="font-semibold text-sm">{propiedad.dormitorios}</span>
								</div>

								<div className="flex items-center gap-2 text-gray-600">
									<Grid2x2PlusIcon className="h-[22px] w-h-[22px] text-orange-500" />
									<span className="font-medium text-sm">Superficie cubierta</span>
									<span className="font-semibold text-sm">
										{propiedad.superficie_cubierta?.toFixed(2)} m²
									</span>
								</div>

								<div className="flex items-center gap-2 text-gray-600">
									<BathIcon className="h-[22px] w-h-[22px] text-orange-500" />
									<span className="font-medium text-sm">Baños</span>
									<span className="font-semibold text-sm">{propiedad.cantidad_banos}</span>
								</div>
							</div>
						</div>
						<div>
							<p>{propiedad.descripcion}</p>
						</div>
						<Separator className="my-4" />
						<div className="flex flex-col gap-4">
							<h2 className="font-semibold text-xl">Conoce más sobre esta propiedad</h2>
							<PropiedadDetailsTab propiedad={propiedad} />
						</div>
						<Separator className="my-4" />
					</div>
					<div>
						<Card className="p-7 shadow-xs">
							<h2 className="font-semibold text-xl">Consultar por esta propiedad</h2>
							<form action="">
								<Input placeholder="Nombre y Apellido" className="mt-4" />
								<Input placeholder="Email" className="mt-4" />
								<div className="flex gap-2">
									<Input placeholder="Consulta" className="mt-4" />
									<Input placeholder="Teléfono" className="mt-4" />
								</div>
								<Textarea placeholder="Mensaje" className="mt-4" />
								<div className="flex gap-2 mt-5">
									<Button className="flex-1 py-6 font-semibold">Contactar</Button>
									<Button variant="whatsapp" className="flex-1 py-6 font-semibold">
										WhatsApp
									</Button>
								</div>
								<Button variant="outline" className="mt-3 w-full py-6">
									<span>Venta</span>
									<span>(0221) 421-7393 | 421-5498</span>
								</Button>
							</form>
						</Card>
					</div>
				</PageContainer>
			</section>
		</div>
	);
};
