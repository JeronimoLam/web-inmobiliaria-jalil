"use client";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useState } from "react";
import { FileTextIcon, LightbulbIcon, DoorClosedIcon, ClipboardIcon } from "@/components/Icons";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import {
	PropiedadDetalles,
	PropiedadServicios,
	PropiedadAmbientes,
	PropiedadCaracteristicas,
} from "./PropiedadDetailsTabListData";

export const PropiedadDetailsTab = ({ propiedad }: { propiedad: Propiedad }) => {
	const allTabs = [
		{
			icon: <FileTextIcon width={22} height={22} />,
			label: "Detalle",
			data: <PropiedadDetalles propiedad={propiedad} />,
		},
		{
			icon: <LightbulbIcon width={22} height={22} />,
			label: "Servicios",
			data: <PropiedadServicios propiedad={propiedad} />,
		},
		{
			icon: <DoorClosedIcon width={22} height={22} />,
			label: "Ambientes",
			data: <PropiedadAmbientes propiedad={propiedad} />,
		},
		{
			icon: <ClipboardIcon width={22} height={22} />,
			label: "Características",
			data: <PropiedadCaracteristicas propiedad={propiedad} />,
		},
	];
	const [detalle, servicios, ambientes, caracteristicas] = allTabs;
	const tabs = [detalle, servicios, ambientes, caracteristicas];

	return (
		<div>
			<DetailTabAnimation tabs={tabs} />
		</div>
	);
};

export default function DetailTabAnimation({
	tabs,
}: {
	tabs: { icon: React.ReactNode; label: string; data: React.ReactNode }[];
}) {
	const [selectedTab, setSelectedTab] = useState(tabs[0]);

	return (
		<div className="w-full rounded-md overflow-hidden flex flex-col">
			<nav className="rounded-t-md border-b-[2px] border-secondary">
				<ul className="grid grid-cols-2 grid-rows-2 md:flex w-full list-none p-0 m-0 font-medium text-[14px]">
					{tabs.map((item) => (
						<motion.li
							key={item.label}
							initial={false}
							animate={{
								backgroundColor: item === selectedTab ? "var(--muted-secondary)" : "#eee0",
							}}
							className="rounded-md rounded-b-none w-full px-3.5 py-2.5 relative cursor-pointer flex items-center flex-1 flex-wrap xl:flex-nowrap select-none text-secondary font-medium text-base"
							onClick={() => setSelectedTab(item)}
						>
							<span className="mr-2">{item.icon}</span>
							<span>{item.label}</span>
							{item === selectedTab ? (
								<motion.div
									className="hidden md:block absolute bottom-[-2px] left-0 right-0 h-[2px] md:h-[2px] bg-primary"
									layoutId="underline"
									id="underline"
								/>
							) : null}
						</motion.li>
					))}
				</ul>
			</nav>
			<div className="flex py-4 lg:pt-4 lg:pb-0">
				<AnimatePresence mode="wait">
					<motion.div
						key={selectedTab ? selectedTab.label : "empty"}
						initial={{ y: 10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -10, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="text-sm"
					>
						{selectedTab && selectedTab.data}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
