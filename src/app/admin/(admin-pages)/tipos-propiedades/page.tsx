import { Button } from "@/components/ui/button";
import { AdminHeader } from "@/modules/admin/components/AdminHeader";
import { DataTable } from "@/modules/admin/components/DataTable";
import { tiposPropiedadesColumns } from "@/modules/admin/tipos-propiedades/columns";
import { formatDateTime } from "@/modules/admin/utils/formatDate";
import { FiltersApiService } from "@/modules/filters/services/filtersApi.service";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function TiposPropiedadesAdminPage() {
	const tiposPropiedad = await FiltersApiService.getTiposPropiedad();

	const tiposPropiedadFormatted = tiposPropiedad.map((tipo) => ({
		...tipo,
		created_at: formatDateTime(new Date(tipo.created_at)),
	}));

	return (
		<>
			<AdminHeader
				title="Tipos de Propiedades"
				action={
					<Button>
						<Link
							href="/admin/tipos-propiedades/nuevo"
							className="flex items-center justify-center gap-2"
						>
							{" "}
							<PlusIcon className="w-4 h-4" /> Nuevo tipo de propiedad
						</Link>
					</Button>
				}
			/>
			<div className="px-4 py-6 sm:p-6">
				<DataTable
					title="Tipos de propiedad"
					columns={tiposPropiedadesColumns}
					data={tiposPropiedadFormatted}
				/>
			</div>
		</>
	);
}
