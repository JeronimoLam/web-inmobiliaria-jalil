import { Button } from "@/components/ui/button";
import { AdminHeader } from "@/modules/admin/components/AdminHeader";
import { LocalidadCreateForm } from "@/modules/admin/localidades/components/LocalidadCreateForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NuevaLocalidadAdminPage() {
	return (
		<>
			<AdminHeader title="Nueva Localidad" />
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
					<h1 className="text-2xl font-bold">Nueva Localidad</h1>
					<p className="text-sm text-gray-500">
						Crea una nueva localidad para que se muestre en el listado de localidades.
					</p>
				</div>
				<LocalidadCreateForm />
			</div>
		</>
	);
}
