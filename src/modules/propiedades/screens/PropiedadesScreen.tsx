"use client";
import { useState } from "react";
import { PageContainer } from "@/components/layouts/PageContainer";
import { PropiedadCard } from "@/modules/propiedades/components/PropiedadCard";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { PropiedadesMap } from "../components/PropiedadesMap";
import { Map, List } from "lucide-react";
import { PropertySearchForm } from "@/components/PropertySearchForm";
import { Button } from "@/components/ui/button";
import { FunnelIcon } from "@/components/Icons";

interface PropiedadesScreenProps {
	propiedades: Propiedad[];
}

export const PropiedadesScreen = ({ propiedades }: PropiedadesScreenProps) => {
	const [showListOnly, setShowListOnly] = useState(true);
	const [showMapOnly, setShowMapOnly] = useState(false);

	// --- toggles actualizados ---
	const toggleListOnly = () => {
		setShowListOnly(true);
		setShowMapOnly(false);
	};

	const toggleMapOnly = () => {
		setShowMapOnly(true);
		setShowListOnly(false);
	};

	// Determinar qué mostrar basado en los estados
	const showList = !showMapOnly; // Mostrar lista si no está activado solo mapa
	const showMap = !showListOnly; // Mostrar mapa si no está activado solo lista

	const allTabs = [
		{ label: "Ver Listado", icon: <List className="w-4 h-4" />, action: "list" },
		{ label: "Ver Mapa", icon: <Map className="w-4 h-4" />, action: "map" },
	];
	const [selectedTab, setSelectedTab] = useState(allTabs[0].label);

	return (
		<div className={`flex flex-col ${showListOnly ? "" : "h-[calc(100vh-70px)]"}`}>
			{/* Sub Navigation Bar */}
			<div className="bg-white border-b border-gray-200 py-4">
				<div
					className={`flex gap-4 flex-col lg:flex-row lg:items-center justify-between px-4 sm:px-8 transition-transform ${showListOnly && "w-full px-4 sm:px-8 xl:max-w-[80rem] 2xl:max-w-[96rem] mx-auto"}`}
				>
					<div className="flex flex-col md:flex-row xl:items-center gap-4">
						<div className="flex-1 lg:w-[600px]">
							<PropertySearchForm localidades={[]} tiposPropiedad={[]} onSearch={() => {}} />
						</div>
						<Button variant="outline" className="w-full sm:w-auto py-selects font-semibold">
							<FunnelIcon width={24} height={24} /> Filtros ({0})
						</Button>
					</div>
					<ul className="flex flex-row gap-2 relative">
						{allTabs.map((item) => {
							const isActive = item.label === selectedTab;
							return (
								<li
									key={item.label}
									onClick={() => {
										setSelectedTab(item.label);

										if (item.action === "list") toggleListOnly();
										if (item.action === "map") toggleMapOnly();
									}}
									className="w-full lg:w-auto hover:bg-muted-secondary/40 hover:rounded-md hover:rounded-b-none transition-colors relative px-3 py-3 cursor-pointer flex items-center select-none text-secondary font-medium text-base"
								>
									{isActive && (
										<div className="absolute inset-0 rounded-md rounded-b-none bg-muted-secondary" />
									)}
									<span className="mr-2 relative z-10">{item.icon}</span>
									<span className="relative z-10">{item.label}</span>
								</li>
							);
						})}
					</ul>
				</div>
			</div>

			{/* Content Area */}
			<div className={`flex ${showListOnly ? "" : "flex-1 overflow-hidden"}`}>
				{/* Properties List */}
				{showList && (
					<div
						className={`${showList && showMap ? "w-1/2" : "w-full"} transition-all duration-300`}
					>
						<PageContainer
							className={`w-full py-8 px-4 lg:px-8 ${showListOnly ? "" : "overflow-y-auto h-full"}`}
						>
							<div className="flex flex-col gap-8">
								{propiedades.map((propiedad) => (
									<PropiedadCard key={propiedad.id} propiedad={propiedad} />
								))}
							</div>
						</PageContainer>
					</div>
				)}

				{/* Map */}
				{showMap && (
					<div
						className={`${showList && showMap ? "w-1/2" : "w-full"} transition-all duration-300`}
					>
						<PropiedadesMap latitud={-34.6037} longitud={-58.3816} />
					</div>
				)}
			</div>
		</div>
	);
};
