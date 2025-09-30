"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { TipoPropiedad } from "@/modules/filters/types/filters.type";

export const tiposPropiedadesColumns: ColumnDef<TipoPropiedad>[] = [
	{
		accessorKey: "id",
		header: "ID",
		cell: ({ row }) => {
			return <div className="font-medium">{row.getValue("id")}</div>;
		},
	},
	{
		accessorKey: "tipo",
		header: "Tipo",
		cell: ({ row }) => {
			const propiedad = row.original;
			return <div className="max-w-[200px] truncate">{propiedad.tipo}</div>;
		},
	},
	{
		accessorKey: "created_at	",
		header: "Creado",
		cell: ({ row }) => {
			const tipo = row.original.created_at;
			return <div>{tipo || "N/A"}</div>;
		},
	},

	{
		id: "acciones",
		header: "Acciones",
		cell: ({ row }) => {
			const propiedad = row.original;

			return (
				<div className="flex items-center space-x-2">
					<Link href={`/admin/tipos-propiedades/${propiedad.id}/edit`}>
						<Button variant="ghost" size="sm" title="Editar">
							<Edit className="h-4 w-4" />
						</Button>
					</Link>
					<Button
						variant="ghost"
						size="sm"
						className="text-red-600 hover:text-red-700"
						title="Eliminar"
						onClick={() => {
							// TODO: Implementar confirmación y eliminación
							console.log("Eliminar tipo de propiedad:", propiedad.id);
						}}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			);
		},
	},
];
