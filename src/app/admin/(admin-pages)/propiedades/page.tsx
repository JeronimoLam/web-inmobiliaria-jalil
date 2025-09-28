import { Button } from "@/components/ui/button";
import { AdminHeader } from "@/modules/admin/components/AdminHeader";
import { DataTable } from "@/modules/admin/components/DataTable";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { getPropiedades } from "@/modules/propiedades/services/get-propiedades.service";
import { columns } from "@/modules/admin/propiedades/columns";

export default async function PropiedadesAdminPage({
	searchParams,
}: {
	searchParams: { page: string; limit: string };
}) {
	const { page, limit } = searchParams;

	const data = await getPropiedades({
		pagination: {
			page: page ? parseInt(page) : 1,
			limit: limit ? parseInt(limit) : 6,
		},
	});
	return (
		<>
			<AdminHeader
				title="Propiedades"
				action={
					<Button>
						<Link
							href="/admin/propiedades/nueva"
							className="flex items-center justify-center gap-2"
						>
							{" "}
							<PlusIcon className="w-4 h-4" /> Nueva propiedad
						</Link>
					</Button>
				}
			/>
			<div className="px-4 py-6 sm:p-6">
				<DataTable columns={columns} data={data.data} pagination={data.pagination} />
			</div>
		</>
	);
}
