"use client";
import { PropiedadCard } from "./PropiedadCard";
import { usePropiedadesStore } from "../store/propiedades.store";
import { PaginatedResponse } from "@/modules/pagination/types/pagination.type";
import { Propiedad } from "../types/propiedad.type";
import { useEffect } from "react";

interface PropiedadesListProps {
	propiedades: PaginatedResponse<Propiedad>;
}

export default function PropiedadesList({ propiedades }: PropiedadesListProps) {
	const showMapOnly = usePropiedadesStore((state) => state.showMapOnly);
	const setHasPropiedades = usePropiedadesStore((state) => state.setHasPropiedades);
	const { data, pagination } = propiedades;

	const showList = !showMapOnly;

	useEffect(() => {
		setHasPropiedades(data.length > 0);
	}, [data, setHasPropiedades]);

	return (
		<>
			{showList && (
				<div className="w-full flex flex-col gap-6 py-2">
					{pagination.totalPages > 0 && (
						<div className="text-sm text-gray-600 font-medium">
							Mostrando <span className="font-bold">{pagination.totalPages}</span> de{" "}
							<span className="font-bold">{pagination.totalItems}</span> propiedades
						</div>
					)}

					{data.length === 0 ? (
						<div className="text-center text-gray-500 py-12">
							No se han encontrado propiedades que coincidan con tu búsqueda.
						</div>
					) : (
						data.map((propiedad) => <PropiedadCard key={propiedad.id} propiedad={propiedad} />)
					)}
				</div>
			)}
		</>
	);
}
