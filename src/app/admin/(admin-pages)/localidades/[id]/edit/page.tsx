import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AdminHeader } from "@/modules/admin/components/AdminHeader";
import { Button } from "@/components/ui/button";
import { getLocalidadById } from "@/modules/admin/localidades/services/get-localidad-by-id.service";
import { LocalidadEditForm } from "@/modules/admin/localidades/components/LocalidadEditForm";

export default async function LocalidadAdminEditPage({
	params,
}: {
	params: Promise<{
		id: string;
	}>;
}) {
	const { id } = await params;
	const localidad = await getLocalidadById(parseInt(id));

	if (!localidad) {
		return notFound();
	}

	return (
		<>
			<AdminHeader title={`${localidad.nombre}`} />
			<div className="px-4 py-6 sm:p-6 flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<Button asChild variant="ghost" size="sm">
						<Link href="/admin/localidades">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Volver
						</Link>
					</Button>
				</div>
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold">Editar Localidad</h1>
					<p className="text-sm text-gray-500">
						Edita la localidad para que se muestre en el listado de propiedades.
					</p>
				</div>
				<LocalidadEditForm localidad={localidad} />
			</div>
		</>
	);
}
