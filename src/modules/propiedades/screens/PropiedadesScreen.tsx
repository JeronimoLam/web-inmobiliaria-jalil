"use client";
import { useState } from "react";
import { PageContainer } from "@/components/layouts/PageContainer";
import { PropiedadCard } from "@/modules/propiedades/components/PropiedadCard";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { PropiedadesMap } from "../components/PropiedadesMap";
import { Map, List, Layout } from "lucide-react";
import * as motion from "motion/react-client";
import { PropertySearchForm } from "@/components/PropertySearchForm";

interface PropiedadesScreenProps {
	propiedades: Propiedad[];
}

export const PropiedadesScreen = ({ propiedades }: PropiedadesScreenProps) => {
	const [showListOnly, setShowListOnly] = useState(false);
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

	const toggleShared = () => {
		setShowListOnly(false);
		setShowMapOnly(false);
	};

	// Determinar qué mostrar basado en los estados
	const showList = !showMapOnly; // Mostrar lista si no está activado solo mapa
	const showMap = !showListOnly; // Mostrar mapa si no está activado solo lista

	const allTabs = [
		{ label: "Vista compartida", icon: <Layout className="w-4 h-4" />, action: "shared" },
		{ label: "Ver Listado", icon: <List className="w-4 h-4" />, action: "list" },
		{ label: "Ver Mapa", icon: <Map className="w-4 h-4" />, action: "map" },
	];
	const [selectedTab, setSelectedTab] = useState(allTabs[0].label);

	return (
		<div className={`flex flex-col ${showListOnly ? "" : "h-[calc(100vh-70px)]"}`}>
			{/* Sub Navigation Bar */}
			<div className="bg-white border-b border-gray-200 py-4">
				<div
					className={`flex items-center justify-between px-4 sm:px-8 transition-transform ${showListOnly && "w-full px-4 sm:px-8 xl:max-w-[80rem] 2xl:max-w-[96rem] mx-auto"}`}
				>
					{/* <h1 className="text-2xl font-bold text-gray-900">Propiedades Disponibles</h1> */}
					<div className="w-[600px]">
						<PropertySearchForm localidades={[]} tiposPropiedad={[]} onSearch={() => {}} />
					</div>
					<ul className="flex gap-2 relative">
						{allTabs.map((item) => {
							const isActive = item.label === selectedTab;
							return (
								<li
									key={item.label}
									onClick={() => {
										setSelectedTab(item.label);

										if (item.action === "list") toggleListOnly();
										if (item.action === "map") toggleMapOnly();
										if (item.action === "shared") toggleShared();
									}}
									className="relative px-3 py-2 cursor-pointer flex items-center select-none text-secondary font-medium text-base"
								>
									{isActive && (
										<motion.div
											layoutId="activeTab"
											className="absolute inset-0 rounded-md rounded-b-none bg-muted-secondary"
											transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
										/>
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
