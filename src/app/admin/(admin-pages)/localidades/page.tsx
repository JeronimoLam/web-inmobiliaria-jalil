import { Button } from "@/components/ui/button";
import { AdminHeader } from "@/modules/admin/components/AdminHeader";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function LocalidadesAdminPage() {
	return (
		<>
			<AdminHeader
				title="Localidades"
				action={
					<Button>
						<Link href="#" className="flex items-center justify-center gap-2">
							{" "}
							<PlusIcon className="w-4 h-4" /> Nueva localidad
						</Link>
					</Button>
				}
			/>
			<div className="p-4">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-bold">Tabla de Localidades</h2>
				</div>
			</div>
		</>
	);
}
