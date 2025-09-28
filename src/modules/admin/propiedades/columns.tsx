"use client";

import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Propiedad>[] = [
	{
		accessorKey: "codigo",
		header: "Código",
		cell: ({ row }) => {
			return <div className="font-medium">{row.getValue("codigo")}</div>;
		},
	},
	{
		accessorKey: "calle",
		header: "Dirección",
		cell: ({ row }) => {
			const propiedad = row.original;
			const direccion = `${propiedad.calle} ${propiedad.numero || ""}`.trim();
			return <div className="max-w-[200px] truncate">{direccion}</div>;
		},
	},
	{
		accessorKey: "tipo_propiedad",
		header: "Tipo",
		cell: ({ row }) => {
			const tipo = row.original.tipo_propiedad;
			return <div>{tipo?.value || "N/A"}</div>;
		},
	},
	{
		accessorKey: "localidad",
		header: "Localidad",
		cell: ({ row }) => {
			const localidad = row.original.localidad;
			return <div>{localidad?.nombre || "N/A"}</div>;
		},
	},
	{
		accessorKey: "precios",
		header: "Precios",
		cell: ({ row }) => {
			const precios = row.original.precios;
			if (!precios || precios.length === 0) {
				return <div className="text-gray-500">Sin precio</div>;
			}

			return (
				<div className="space-y-1">
					{precios.map((precio, index) => (
						<div key={index} className="text-sm">
							<span className="font-medium">{precio.importe.toLocaleString()}</span>
							<span className="text-gray-500 ml-1">{precio.divisa}</span>
							<Badge variant="secondary" className="ml-2 text-xs">
								{precio.estado_publicacion.nombre}
							</Badge>
						</div>
					))}
				</div>
			);
		},
	},
	{
		accessorKey: "destacada",
		header: "Estado",
		cell: ({ row }) => {
			const destacada = row.getValue("destacada") as boolean;
			return (
				<Badge variant={destacada ? "default" : "secondary"}>
					{destacada ? "Destacada" : "Normal"}
				</Badge>
			);
		},
	},
	{
		id: "acciones",
		header: "Acciones",
		cell: ({ row }) => {
			const propiedad = row.original;

			return (
				<div className="flex items-center space-x-2">
					<Link href={`/admin/propiedades/${propiedad.codigo}`}>
						<Button variant="ghost" size="sm" title="Ver detalles">
							<Eye className="h-4 w-4" />
						</Button>
					</Link>
					<Link href={`/admin/propiedades/${propiedad.codigo}/edit`}>
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
							console.log("Eliminar propiedad:", propiedad.id);
						}}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			);
		},
	},
];
