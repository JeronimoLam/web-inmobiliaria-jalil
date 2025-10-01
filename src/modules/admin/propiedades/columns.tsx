"use client";

import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit } from "lucide-react";
import Link from "next/link";
import { DeletePropiedadButton } from "./components/DeletePropiedadButton";
import { EditPropiedadButton } from "./components/EditPropiedadButton";

export const propiedadesColumns: ColumnDef<Propiedad>[] = [
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
							<span className="font-medium">${precio.importe.toLocaleString()}</span>
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
					<EditPropiedadButton propiedad={propiedad} />
					<DeletePropiedadButton id={propiedad.id} context="table" />
				</div>
			);
		},
	},
];
