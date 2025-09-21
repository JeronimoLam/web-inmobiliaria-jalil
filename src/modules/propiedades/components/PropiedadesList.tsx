"use client";
import { PropiedadCard } from "./PropiedadCard";
import { PropiedadesPagination } from "./PropiedadesPagination";
import { usePropiedadesStore } from "../store/propiedades.store";
import { PaginatedResponse } from "@/modules/pagination/types/pagination.type";
import { Propiedad } from "../types/propiedad.type";
import { useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface PropiedadesListProps {
	propiedades: PaginatedResponse<Propiedad>;
}

export default function PropiedadesList({ propiedades }: PropiedadesListProps) {
	const showMapOnly = usePropiedadesStore((state) => state.showMapOnly);
	const setHasPropiedades = usePropiedadesStore((state) => state.setHasPropiedades);
	const { data, pagination } = propiedades;
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const operacion = pathname.split("/")[2] === "venta" ? "venta" : "alquiler";

	const showList = !showMapOnly;

	useEffect(() => {
		setHasPropiedades(data.length > 0);
	}, [data, setHasPropiedades]);

	const handlePageChange = (page: number) => {
		const currentParams = new URLSearchParams(searchParams.toString());
		currentParams.set("page", page.toString());
		const newUrl = `${pathname}?${currentParams.toString()}`;
		router.push(newUrl);
	};

	return (
		<>
			{showList && (
				<div className="min-h-[calc(100vh-150px)] flex flex-col">
					<div className="w-full flex flex-col gap-6 pt-2 pb-10 lg:pb-14 flex-1">
						{pagination.totalPages > 0 && (
							<div>
								<span className="font-bold">{pagination.totalItems}</span> propiedades en{" "}
								{operacion}
							</div>
						)}

						{data.length === 0 ? (
							<div className="text-center text-gray-500 py-12 flex-1 flex items-center justify-center">
								No se han encontrado propiedades que coincidan con tu búsqueda.
							</div>
						) : (
							data.map((propiedad) => <PropiedadCard key={propiedad.id} propiedad={propiedad} />)
						)}
					</div>
					<PropiedadesPagination
						className="pb-10 lg:pb-14"
						pagination={pagination}
						handlePageChange={handlePageChange}
					/>
				</div>
			)}
		</>
	);
}
