import { Button } from "@/components/ui/button";
import { AdminHeader } from "@/modules/admin/components/AdminHeader";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function TiposPropiedadesAdminPage() {
	return (
		<>
			<AdminHeader
				title="Tipos de Propiedades"
				action={
					<Button>
						<Link href="#" className="flex items-center justify-center gap-2">
							{" "}
							<PlusIcon className="w-4 h-4" /> Nuevo tipo de propiedad
						</Link>
					</Button>
				}
			/>
			<div className="p-4">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-bold">Tabla de Tipos de Propiedades</h2>
				</div>
			</div>
		</>
	);
}
