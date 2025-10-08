"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import type { PaginationResponse } from "@/modules/pagination/types/pagination.type";
// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pagination?: PaginationResponse;
	searchTitle?: string;
	title: string;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	pagination,
	// searchTitle,
	title,
}: DataTableProps<TData, TValue>) {
	const [globalFilter, setGlobalFilter] = useState("");
	const router = useRouter();
	const searchParams = useSearchParams();

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			globalFilter,
		},
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: "includesString",
		manualPagination: true,
		pageCount: pagination?.totalPages,
	});

	const updatePage = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", newPage.toString());
		router.push(`?${params.toString()}`);
	};

	const updatePageSize = (newLimit: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("limit", newLimit.toString());
		params.set("page", "1");
		router.push(`?${params.toString()}`);
	};

	return (
		<div className="space-y-4">
			<div className="flex sm:flex-row flex-col gap-4 items-center justify-between">
				<div className="flex items-center space-x-2">
					{/* TODO: Buscador oculto (funcionalidad aún no implementada) */}

					{/* <div className="relative">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder={`Buscar ${searchTitle || title.toLowerCase()}...`}
							value={globalFilter}
							onChange={(e) => setGlobalFilter(e.target.value)}
							className="pl-8 w-[300px]"
						/>
					</div> */}
				</div>
				{pagination && (
					<div className="flex items-center space-x-4">
						<div className="text-sm text-muted-foreground">
							{pagination.startIndex + 1}-{pagination.endIndex} de {pagination.totalItems}{" "}
							{title.toLowerCase()}
						</div>
					</div>
				)}
			</div>

			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									<div className="flex flex-col items-center space-y-2">
										<div className="text-muted-foreground">No se encontraron propiedades</div>
										<div className="text-sm text-muted-foreground">
											{globalFilter
												? "Intenta con otros términos de búsqueda"
												: "No hay propiedades registradas"}
										</div>
									</div>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{pagination && (
				<div className="flex sm:flex-row flex-col gap-4 items-center justify-between px-2">
					<div className="flex items-center space-x-2">
						<p className="text-sm font-medium">
							Página {pagination.currentPage} de {pagination.totalPages}
						</p>
						<div className="flex items-center space-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => updatePage(1)}
								disabled={!pagination.hasPreviousPage}
							>
								<ChevronsLeft className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => updatePage(pagination.currentPage - 1)}
								disabled={!pagination.hasPreviousPage}
							>
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => updatePage(pagination.currentPage + 1)}
								disabled={!pagination.hasNextPage}
							>
								<ChevronRight className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => updatePage(pagination.totalPages)}
								disabled={!pagination.hasNextPage}
							>
								<ChevronsRight className="h-4 w-4" />
							</Button>
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<p className="text-sm text-muted-foreground">Filas por página:</p>
						<select
							value={pagination.itemsPerPage}
							onChange={(e) => {
								updatePageSize(Number(e.target.value));
							}}
							className="h-8 w-[70px] rounded border border-input bg-background px-2 text-sm"
						>
							{[6, 12, 20, 30, 40, 50].map((pageSize) => (
								<option key={pageSize} value={pageSize}>
									{pageSize}
								</option>
							))}
						</select>
					</div>
				</div>
			)}
		</div>
	);
}
