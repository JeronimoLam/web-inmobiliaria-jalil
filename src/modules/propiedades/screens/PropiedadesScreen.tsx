// "use client";
// import { Suspense, useState } from "react";
// import { FilterData, PropiedadFilters } from "@/modules/filters/types/filters.type";
// import SubNavbar from "../components/SubNavbar";
// import PropiedadesList from "../components/PropiedadesList";
// import { PaginationParams } from "@/modules/pagination/types/pagination.type";
// import { PageContainer } from "@/components/layouts/PageContainer";
// import { PropiedadesMap } from "../components/PropiedadesMap";

// interface PropiedadesScreenProps {
// 	operacion: string;
// 	filterData: FilterData;
// 	filtersParams: PropiedadFilters;
// 	paginationParams: {
// 		page: number | "" | undefined;
// 		limit: number | "" | undefined;
// 	};
// }

// export const PropiedadesScreen = ({
// 	operacion,
// 	filterData,
// 	filtersParams,
// 	paginationParams,
// }: PropiedadesScreenProps) => {
// 	// const [showListOnly, setShowListOnly] = useState(true);
// 	// const [showMapOnly, setShowMapOnly] = useState(false);

// 	// const showList = !showMapOnly; // Mostrar lista si no está activado solo mapa
// 	// const showMap = !showListOnly; // Mostrar mapa si no está activado solo lista

// 	return (
// 		<div className={`flex flex-col ${showListOnly ? "" : "h-[calc(100vh-70px)]"}`}>
// 			{/* SubNavbar siempre visible, no hace Suspense */}
// 			<SubNavbar
// 				hasPropiedades={true} // esto puede depender de la data luego
// 				filterData={filterData}
// 			/>
// 			{/*
// 			<div className={`flex ${showListOnly ? "" : "flex-1 overflow-hidden"}`}>
// 				{showList && (
// 					<Suspense
// 						fallback={<div className="w-full py-12 text-center">Cargando propiedades...</div>}
// 					>
// 						<PropiedadesList
// 							operacion={operacion}
// 							filtersParams={filtersParams}
// 							paginationParams={paginationParams}
// 							showMap={showMap}
// 						/>
// 					</Suspense>
// 				)}

// 				{showMap && (
// 					<Suspense fallback={<div className="w-full py-12 text-center">Cargando mapa...</div>}>
// 						<PropiedadesList
// 							operacion={operacion}
// 							filtersParams={filtersParams}
// 							paginationParams={paginationParams}
// 							showList={showList}
// 						/>
// 					</Suspense>
// 				)}
// 			</div> */}
// 		</div>
// 	);
// };
