"use client";
import React, { useState } from "react";
import { ListIcon, MapIcon } from "@/components/Icons";
import { PropertySearchForm } from "@/components/PropertySearchForm";
import { FilterSideBar } from "@/modules/propiedades/components/FilterSideBar";
import { FiltersProvider } from "../context/FiltersContext";

interface SubNavbarProps {
	showListOnly: boolean;
	hasPropiedades: boolean;
	setShowListOnly: (value: boolean) => void;
	setShowMapOnly: (value: boolean) => void;
}

export default function SubNavbar({
	showListOnly,
	hasPropiedades,
	setShowListOnly,
	setShowMapOnly,
}: SubNavbarProps) {
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
		<div className="py-4">
			<div
				className={`flex gap-4 flex-col lg:flex-row lg:items-center justify-between px-4 sm:px-8 transition-transform ${showListOnly && "w-full px-4 sm:px-8 xl:max-w-[80rem] 2xl:max-w-[96rem] mx-auto"}`}
			>
				<div className="flex flex-col md:flex-row xl:items-center gap-4">
					<div className="flex-1 lg:w-[600px]">
						<PropertySearchForm
							withBorder
							localidades={[]}
							tiposPropiedad={[]}
							onSearch={() => {}}
						/>
					</div>
					<FiltersProvider>
						<FilterSideBar />
					</FiltersProvider>
				</div>
				<ul className="flex flex-row gap-2 relative">
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
								className={`w-full lg:w-auto hover:rounded-md hover:rounded-b-none transition-colors relative px-3 py-3 flex items-center select-none text-secondary font-medium ${
									isDisabled ? "opacity-50" : "cursor-pointer hover:bg-muted-secondary/40"
								}`}
							>
								{isActive && !isDisabled && (
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
	);
}
