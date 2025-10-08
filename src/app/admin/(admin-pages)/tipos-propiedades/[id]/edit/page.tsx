import { AdminHeader } from "@/modules/admin/components/AdminHeader";
import { getTipoPropiedadById } from "@/modules/admin/tipos-propiedades/services/get-tipo-propiedad-by-id.service";
import { notFound } from "next/navigation";
import React from "react";
import { TipoPropiedadEditForm } from "@/modules/admin/tipos-propiedades/components/TipoPropiedadEditForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function TipoPropiedadAdminEditPage({
	params,
}: {
	params: Promise<{
		id: string;
	}>;
}) {
	const { id } = await params;
	const tipoPropiedad = await getTipoPropiedadById(parseInt(id));

	if (!tipoPropiedad) {
		return notFound();
	}

	return (
		<>
			<AdminHeader title={`${tipoPropiedad.tipo}`} />
			<div className="px-4 py-6 sm:p-6 flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<Button asChild variant="ghost" size="sm">
						<Link href="/admin/tipos-propiedades">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Volver
						</Link>
					</Button>
				</div>
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold">Editar Tipo de Propiedad</h1>
					<p className="text-sm text-gray-500">
						Edita el tipo de propiedad para que se muestre en el listado de tipos de propiedades.
					</p>
				</div>
				<TipoPropiedadEditForm tipoPropiedad={tipoPropiedad} />
			</div>
		</>
	);
}
