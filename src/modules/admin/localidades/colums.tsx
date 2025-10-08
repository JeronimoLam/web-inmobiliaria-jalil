"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Localidad } from "@/modules/filters/types/filters.type";

export const localidadesColumns: ColumnDef<Localidad>[] = [
	{
		accessorKey: "id",
		header: "ID",
		cell: ({ row }) => {
			return <div className="font-medium">{row.getValue("id")}</div>;
		},
	},
	{
		accessorKey: "nombre",
		header: "Nombre",
		cell: ({ row }) => {
			const localidad = row.original;
			return <div className="max-w-[200px] truncate">{localidad.nombre}</div>;
		},
	},
	{
		accessorKey: "created_at	",
		header: "Creado",
		cell: ({ row }) => {
			const localidad = row.original.created_at;
			return <div>{localidad || "N/A"}</div>;
		},
	},

	{
		id: "acciones",
		header: "Acciones",
		cell: ({ row }) => {
			const localidad = row.original;

			return (
				<div className="flex items-center space-x-2">
					<Link href={`/admin/localidades/${localidad.id}/edit`}>
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
							console.log("Eliminar localidad:", localidad.id);
						}}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			);
		},
	},
];
