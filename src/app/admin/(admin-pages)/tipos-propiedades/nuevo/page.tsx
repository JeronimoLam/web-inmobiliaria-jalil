import { Button } from "@/components/ui/button";
import { AdminHeader } from "@/modules/admin/components/AdminHeader";
import { TipoPropiedadCreateForm } from "@/modules/admin/tipos-propiedades/components/TipoPropiedadCreateForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NuevoTipoPropiedadAdminPage() {
	return (
		<>
			<AdminHeader title="Nuevo Tipo de Propiedad" />
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
					<h1 className="text-2xl font-bold">Nuevo Tipo de Propiedad</h1>
					<p className="text-sm text-gray-500">
						Crea un nuevo tipo de propiedad para que se muestre en el listado de tipos de
						propiedades.
					</p>
				</div>
				<TipoPropiedadCreateForm />
			</div>
		</>
	);
}
