"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { buildPropiedadTitle } from "@/modules/propiedades/utils/propiedadPropertyBuilder";
import {
	ArrowLeft,
	Edit,
	Home,
	DollarSign,
	Calendar,
	ListChecks,
	Sparkles,
	MapPin,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PropiedadGallery } from "@/modules/propiedades/components/propiedad-detail/PropiedadGallery";
import { formatDateTime } from "../../utils/formatDate";
import { PropiedadMap } from "@/modules/propiedades/components/propiedad-detail/PropiedadMap";
import { DeletePropiedadButton } from "./DeletePropiedadButton";

export const PropiedadDetailAdmin = ({ propiedad }: { propiedad: Propiedad }) => {
	const router = useRouter();
	const title = buildPropiedadTitle(propiedad);

	const formatPrice = (price: number, currency: string) => `${price.toLocaleString()} ${currency}`;

	const formatDate = (date: Date) => formatDateTime(new Date(date));

	return (
		<div className="px-4 py-6 sm:p-6 space-y-5">
			<div className="flex items-center justify-between">
				<Button variant="ghost" size="sm" onClick={() => router.back()}>
					<ArrowLeft className="mr-2 h-4 w-4" />
					<span className="hidden sm:block">Volver</span>
				</Button>

				<div className="flex gap-2">
					<Link href={`/admin/propiedades/${propiedad.codigo}/edit`}>
						<Button size="sm">
							<Edit className="mr-2 h-4 w-4" />
							Editar
						</Button>
					</Link>
					<DeletePropiedadButton id={propiedad.id} context="detail" text={true} />
				</div>
			</div>
			<div className="rounded-xl overflow-hidden">
				<PropiedadGallery propiedad={propiedad} />
			</div>

			<Card className="py-6">
				<CardHeader>
					<CardTitle className="flex items-center text-lg">
						<Home className="mr-2 h-4 w-4" /> Información General
					</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
					<div>
						<p className=" text-muted-foreground font-medium">Código</p>
						<p className="text-base font-semibold">#{propiedad.codigo}</p>
					</div>
					<div>
						<p className=" text-muted-foreground font-medium">Tipo de Propiedad</p>
						<p className="text-base font-medium">
							{propiedad.tipo_propiedad?.value || "No especificado"}
						</p>
					</div>
					<div>
						<p className=" text-muted-foreground font-medium">Dirección</p>
						<p className="text-base font-medium">{title}</p>
					</div>
					<div>
						<p className=" text-muted-foreground font-medium">Ubicación</p>
						<p className="text-base font-medium">
							{propiedad.localidad?.nombre || "No especificada"}
						</p>
					</div>
					<div>
						<p className=" text-muted-foreground font-medium">Estado</p>
						<Badge variant={propiedad.destacada ? "default" : "secondary"}>
							{propiedad.destacada ? "Destacada" : "Normal"}
						</Badge>
					</div>
					{propiedad.descripcion && (
						<div className="col-span-full">
							<p className=" text-muted-foreground font-medium">Descripción</p>
							<p className="mt-1">{propiedad.descripcion}</p>
						</div>
					)}
				</CardContent>
			</Card>

			<Card className="py-6">
				<CardHeader>
					<CardTitle className="flex items-center text-lg">
						<DollarSign className="mr-1 h-4 w-4" /> Precios
					</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{propiedad.precios[0] && (
						<div className="rounded-md border p-4">
							<p className="text-xs text-muted-foreground font-medium">Venta</p>
							<p className="text-xl font-semibold text-green-600">
								{formatPrice(propiedad.precios[0].importe, propiedad.precios[0].divisa)}
							</p>
						</div>
					)}
					{propiedad.precios[1] && (
						<div className="rounded-md border p-4">
							<p className="text-xs text-muted-foreground font-medium">Alquiler</p>
							<p className="text-xl font-semibold text-blue-600">
								{formatPrice(propiedad.precios[1].importe, propiedad.precios[1].divisa)}
								/mes
							</p>
						</div>
					)}
					{propiedad.expensas_value && (
						<div className="rounded-md border p-4">
							<p className="text-xs text-muted-foreground font-medium">Expensas</p>
							<p className="text-lg font-medium">
								{formatPrice(propiedad.expensas_value, propiedad.expensas_divisa || "ARS")}
								/mes
							</p>
						</div>
					)}
				</CardContent>
			</Card>

			{propiedad.detalles && (
				<Card className="py-6">
					<CardHeader>
						<CardTitle className="flex items-center text-lg">
							<ListChecks className="mr-2 h-4 w-4" /> Detalles
						</CardTitle>
					</CardHeader>
					<CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{[
							["Dormitorios", propiedad.detalles.dormitorios],
							["Baños", propiedad.detalles.banos],
							["Toilettes", propiedad.detalles.toilettes],
							["Cocheras", propiedad.detalles.garage],
							[
								"Superficie Total",
								propiedad.detalles.superficie_total_construida
									? `${propiedad.detalles.superficie_total_construida}m²`
									: null,
							],
							[
								"Cubierta",
								propiedad.detalles.superficie_cubierta
									? `${propiedad.detalles.superficie_cubierta}m²`
									: null,
							],
							[
								"Terreno",
								propiedad.detalles.superficie_lote
									? `${propiedad.detalles.superficie_lote}m²`
									: null,
							],
							["Antigüedad", propiedad.detalles.antiguedad],
						]
							.filter(([, value]) => value)
							.map(([label, value]) => (
								<div
									key={label}
									className="flex flex-col items-center justify-center rounded-md border p-3"
								>
									<p className="text-lg font-semibold">{value}</p>
									<p className="text-sm text-muted-foreground">{label}</p>
								</div>
							))}
					</CardContent>
				</Card>
			)}

			<Card className="py-6">
				<CardHeader>
					<CardTitle className="flex items-center text-lg">
						<Sparkles className="mr-2 h-4 w-4" /> Características
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{["ambientes", "caracteristicas", "servicios"].map((section) => {
						const data = propiedad[section as keyof Propiedad] as Record<string, boolean>;
						if (!data) return null;
						const items = Object.entries(data).filter(
							([key, value]) => value === true && key !== "id",
						);
						if (!items.length) return null;
						return (
							<div key={section}>
								<h4 className="text-base font-medium mb-2 capitalize">{section}</h4>
								<div className="flex flex-wrap gap-2">
									{items.map(([key]) => (
										<Badge key={key} variant="outline">
											{key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
										</Badge>
									))}
								</div>
							</div>
						);
					})}
				</CardContent>
			</Card>

			<Card className="py-6">
				<CardHeader>
					<CardTitle className="flex items-center text-lg">
						<Calendar className="mr-2 h-4 w-4" /> Información del Sistema
					</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<p className="text-base text-muted-foreground font-medium">Creada</p>
						<p>{formatDate(propiedad.created_at)}</p>
					</div>
					<div>
						<p className="text-base text-muted-foreground font-medium">Última actualización</p>
						<p>{formatDate(propiedad.updated_at)}</p>
					</div>
				</CardContent>
			</Card>

			<Card className="py-6">
				<CardHeader>
					<CardTitle className="flex items-center text-lg">
						<MapPin className="mr-2 h-4 w-4" /> Ubicación
					</CardTitle>
				</CardHeader>
				<CardContent>
					<PropiedadMap
						latitud={propiedad.map_location.coordinates[0]}
						longitud={propiedad.map_location.coordinates[1]}
					/>
				</CardContent>
			</Card>
		</div>
	);
};
