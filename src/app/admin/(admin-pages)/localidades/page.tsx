import { Button } from "@/components/ui/button";
import { AdminHeader } from "@/modules/admin/components/AdminHeader";
import { DataTable } from "@/modules/admin/components/DataTable";
import { localidadesColumns } from "@/modules/admin/localidades/colums";
import { formatDateTime } from "@/modules/admin/utils/formatDate";
import { FiltersApiService } from "@/modules/filters/services/filtersApi.service";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function LocalidadesAdminPage() {
	const localidades = await FiltersApiService.getLocalidades();

	const localidadesFormatted = localidades.map((localidad) => ({
		...localidad,
		created_at: formatDateTime(new Date(localidad.created_at)),
	}));

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
			<div className="px-4 py-6 sm:p-6">
				<DataTable title="Localidades" columns={localidadesColumns} data={localidadesFormatted} />
			</div>
		</>
	);
}
