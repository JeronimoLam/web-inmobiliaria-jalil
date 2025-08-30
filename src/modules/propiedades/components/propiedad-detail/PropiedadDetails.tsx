import { BathIcon, BedDoubleIcon, Grid2x2PlusIcon } from "@/components/Icons";
import { Separator } from "@/components/ui/separator";
import { PropiedadDetailsTab } from "@/modules/propiedades/components/propiedad-detail/PropiedadDetailsTab";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";

export const PropiedadDetails = ({ propiedad }: { propiedad: Propiedad }) => {
	return (
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
			<Separator className="my-6" />
			<div className="flex flex-col gap-4">
				<h2 className="font-semibold text-xl">Conoce más sobre esta propiedad</h2>
				<PropiedadDetailsTab propiedad={propiedad} />
			</div>
		</div>
	);
};
