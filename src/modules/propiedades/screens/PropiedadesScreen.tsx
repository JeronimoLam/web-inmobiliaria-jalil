"use client";
import { useState } from "react";
import { PageContainer } from "@/components/layouts/PageContainer";
import { PropiedadCard } from "@/modules/propiedades/components/PropiedadCard";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { PropiedadesMap } from "../components/PropiedadesMap";
import { PropiedadesPagination } from "@/modules/propiedades/components/PropiedadesPagination";
import { usePagination } from "@/modules/propiedades/hooks/usePagination";
import SubNavbar from "../components/SubNavbar";

interface PropiedadesScreenProps {
	propiedades: Propiedad[];
	itemsPerPage?: number;
	operacion: "venta" | "alquiler";
}

export const PropiedadesScreen = ({
	propiedades,
	itemsPerPage = 5,
	operacion,
}: PropiedadesScreenProps) => {
	const [showListOnly, setShowListOnly] = useState(true);
	const [showMapOnly, setShowMapOnly] = useState(false);

	const showList = !showMapOnly; // Mostrar lista si no está activado solo mapa
	const showMap = !showListOnly; // Mostrar mapa si no está activado solo lista

	console.log(operacion);

	const {
		currentItems,
		currentPage,
		totalPages,
		totalItems,
		startIndex,
		endIndex,
		handlePageChange,
	} = usePagination({
		items: propiedades,
		itemsPerPage,
	});

	return (
		<div className={`flex flex-col ${showListOnly ? "" : "h-[calc(100vh-70px)]"}`}>
			<SubNavbar
				showListOnly={showListOnly}
				setShowListOnly={setShowListOnly}
				setShowMapOnly={setShowMapOnly}
			/>
			<div className={`flex ${showListOnly ? "" : "flex-1 overflow-hidden"}`}>
				{showList && (
					<div
						className={`${showList && showMap ? "w-1/2" : "w-full"} transition-all duration-300`}
					>
						<PageContainer
							className={`w-full pb-8 pt-6 px-4 lg:px-8 ${showListOnly ? "" : "overflow-y-auto h-full"}`}
						>
							<div className="flex flex-col gap-6">
								{showListOnly && totalItems > 0 && (
									<div className="text-sm text-gray-600 font-medium">
										Mostrando{" "}
										<span className="font-bold">
											{startIndex + 1}-{Math.min(endIndex, totalItems)}
										</span>{" "}
										de <span className="font-bold">{totalItems}</span> propiedades
									</div>
								)}

								{currentItems.map((propiedad) => (
									<PropiedadCard key={propiedad.id} propiedad={propiedad} />
								))}

								{showListOnly && (
									<PropiedadesPagination
										currentPage={currentPage}
										totalPages={totalPages}
										onPageChange={handlePageChange}
									/>
								)}
							</div>
						</PageContainer>
					</div>
				)}

				{showMap && (
					<div
						className={`${showList && showMap ? "w-1/2" : "w-full"} transition-all duration-300`}
					>
						<PropiedadesMap propiedades={propiedades} />
					</div>
				)}
			</div>
		</div>
	);
};
