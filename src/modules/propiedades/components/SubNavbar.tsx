"use client";
import React, { useState } from "react";
import { ListIcon, MapIcon } from "@/components/Icons";
import { PropertySearchForm } from "@/components/PropertySearchForm";
import { FilterSideBar } from "@/modules/propiedades/components/FilterSideBar";
import { FiltersProvider } from "../../filters/context/FiltersContext";
import { FilterData } from "@/modules/filters/types/filters.type";
import { usePropertySearchSync } from "../hooks/usePropertySearchSync";
import { usePropiedadesStore } from "../store/propiedades.store";

interface SubNavbarProps {
	filterData: FilterData;
}

export default function SubNavbar({ filterData }: SubNavbarProps) {
	const { initialTipoPropiedad, initialLocalidad, handleSearchFormSubmit } =
		usePropertySearchSync();
	const showListOnly = usePropiedadesStore((state) => state.showListOnly);
	const setShowListOnly = usePropiedadesStore((state) => state.setShowListOnly);
	const setShowMapOnly = usePropiedadesStore((state) => state.setShowMapOnly);
	const hasPropiedades = usePropiedadesStore((state) => state.hasPropiedades);

	const allTabs = [
		{ label: "Ver Listado", icon: <ListIcon width={20} height={20} />, action: "list" },
		{ label: "Ver Mapa", icon: <MapIcon width={20} height={20} />, action: "map" },
	];
	const [selectedTab, setSelectedTab] = useState(allTabs[0].label);

	const toggleListOnly = () => {
		setShowListOnly(true);
		setShowMapOnly(false);
	};

	const toggleMapOnly = () => {
		setShowMapOnly(true);
		setShowListOnly(false);
	};

	return (
		<div className="max-h-[80px] py-4 fixed top-[70px] left-0 right-0 bg-background z-10">
			<div
				className={`flex gap-4 lg:items-center justify-between px-4 sm:px-8 transition-transform ${showListOnly && "w-full px-4 sm:px-8 xl:max-w-[80rem] 2xl:max-w-[96rem] mx-auto"}`}
			>
				<div className="hidden lg:flex flex-col md:flex-row xl:items-center gap-4">
					<div className="hidden lg:block lg:w-[600px]">
						<PropertySearchForm
							withBorder
							localidades={filterData.localidades}
							tiposPropiedad={filterData.tiposPropiedad}
							initialTipoPropiedad={initialTipoPropiedad}
							initialLocalidad={initialLocalidad}
							onSearch={handleSearchFormSubmit}
						/>
					</div>
					<FiltersProvider>
						<FilterSideBar filterData={filterData} />
					</FiltersProvider>
				</div>
				<ul className="flex flex-row gap-2 justify-end relative w-full subnavbar-buttons:w-auto">
					<div className="block lg:hidden w-full">
						<FiltersProvider>
							<FilterSideBar filterData={filterData} />
						</FiltersProvider>
					</div>
					{allTabs.map((item) => {
						const isActive = item.label === selectedTab;
						const isDisabled = !hasPropiedades;
						return (
							<li
								key={item.label}
								onClick={() => {
									if (isDisabled) return;
									setSelectedTab(item.label);

									if (item.action === "list") toggleListOnly();
									if (item.action === "map") toggleMapOnly();
								}}
								className={`w-full subnavbar-buttons:w-auto hover:rounded-md hover:rounded-b-none transition-colors relative lg:px-3 lg:py-3 flex items-center justify-center select-none text-secondary font-medium ${
									isDisabled ? "opacity-50" : "cursor-pointer hover:bg-muted-secondary/40"
								}`}
							>
								{isActive && !isDisabled && (
									<div className="absolute inset-0 rounded-md rounded-b-none bg-muted-secondary" />
								)}
								<div className="flex gap-2 items-center justify-center">
									<span className="relative z-10">{item.icon}</span>
									<span className="hidden subnavbar-buttons:block relative z-10">{item.label}</span>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
