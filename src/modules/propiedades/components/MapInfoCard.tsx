import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BathIcon, BedDoubleIcon, Grid2x2PlusIcon } from "@/components/Icons";

import { EstadoPublicacionEnum, Propiedad } from "../types/propiedad.type";
import { getPropiedadDetailUrl } from "../utils/getPropiedadDetailUrl";
import { buildPropiedadTitle } from "../utils/propiedadPropertyBuilder";

export const MapInfoCard = ({ propiedad }: { propiedad: Propiedad }) => {
	return (
		<div className="px-2 pb-2 max-w-80">
			{propiedad.imagenes.length > 0 && (
				<div>
					<Image
						src={propiedad.imagenes.find((img) => img.principal)?.url || propiedad.imagenes[0].url}
						alt={buildPropiedadTitle(propiedad)}
						width={300}
						height={200}
						className="w-full h-32 object-cover rounded-lg rounded-b-none"
					/>
				</div>
			)}
			<div className="border border-muted p-2">
				<h3 className="font-bold text-lg text-gray-900 mb-2">{buildPropiedadTitle(propiedad)}</h3>

				<div className="mb-3">
					{(() => {
						const precioVenta = propiedad.precios.find(
							(p) => p.estado_publicacion.nombre === EstadoPublicacionEnum.VENTA && p.importe > 0,
						);
						const precioAlquiler = propiedad.precios.find(
							(p) =>
								p.estado_publicacion.nombre === EstadoPublicacionEnum.ALQUILER && p.importe > 0,
						);

						if (precioVenta) {
							return (
								<div className="text-xl font-bold text-green-600">
									{precioVenta.divisa} {precioVenta.importe.toLocaleString()}
								</div>
							);
						} else if (precioAlquiler) {
							return (
								<div className="text-xl font-black text-green-600">
									{precioAlquiler.divisa} {precioAlquiler.importe.toLocaleString()}/mes
								</div>
							);
						} else {
							return <div className="text-xl font-bold text-blue-600">Consultar</div>;
						}
					})()}
				</div>

				{propiedad.detalles && (
					<div className="flex flex-wrap gap-2 mb-3 text-sm text-gray-600">
						{propiedad.detalles.dormitorios > 0 && (
							<span className="flex items-center gap-1">
								<BedDoubleIcon width={20} height={20} className="text-primary" />{" "}
								{propiedad.detalles.dormitorios} dorm.
							</span>
						)}
						{propiedad.detalles.banos > 0 && (
							<span className="flex items-center gap-1">
								<BathIcon width={20} height={20} className="text-primary" />{" "}
								{propiedad.detalles.banos} baños
							</span>
						)}
						{propiedad.detalles.superficie_cubierta > 0 && (
							<span className="flex items-center gap-1">
								<Grid2x2PlusIcon width={20} height={20} className="text-primary" />{" "}
								{propiedad.detalles.superficie_cubierta}m²
							</span>
						)}
					</div>
				)}

				{propiedad.descripcion && (
					<p className="text-sm text-gray-700 mb-3">{propiedad.descripcion}</p>
				)}
			</div>

			<Button asChild className="w-full rounded-t-none py-6" variant="secondary">
				<Link href={getPropiedadDetailUrl(propiedad)}>Ver Propiedad</Link>
			</Button>
		</div>
	);
};
