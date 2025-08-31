"use client";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useState } from "react";
import {
	FileTextIcon,
	LightbulbIcon,
	DoorClosedIcon,
	ClipboardIcon,
	CircleCheckBigIcon,
} from "lucide-react";
import { Propiedad } from "../../types/propiedad.type";

interface PropiedadTabsDataProps {
	propiedad: Propiedad;
}

const formatWord = (str: string): string => {
	return str.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
};

const ShowDetailList = ({ propiedadList }: { propiedadList: [key: string, value: boolean][] }) => {
	return (
		<div>
			<ul className="flex flex-col gap-2">
				{propiedadList.map(
					([key, value]) =>
						value && (
							<li key={key} className="flex gap-2">
								<CircleCheckBigIcon className="text-primary" size={20} />
								<p>{formatWord(key)}</p>
							</li>
						),
				)}
			</ul>
		</div>
	);
};

const PropiedadDetalle = ({ propiedad }: PropiedadTabsDataProps) => {
	return (
		<div>
			<ul className="flex flex-col gap-2">
				{[1, 2, 3].map((_, idx) => (
					<li key={idx} className="flex gap-2">
						<CircleCheckBigIcon className="text-primary" size={20} />
						<p>{formatWord(`detalle_${idx + 1}`)}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

const PropiedadServicios = ({ propiedad }: PropiedadTabsDataProps) => {
	const propiedadesServicios = Object.entries(propiedad.servicios);

	return <ShowDetailList propiedadList={propiedadesServicios} />;
};

const PropiedadAmbientes = ({ propiedad }: PropiedadTabsDataProps) => {
	const propiedadesAmbientes = Object.entries(propiedad.ambientes);

	return <ShowDetailList propiedadList={propiedadesAmbientes} />;
};

const PropiedadCaracteristicas = ({ propiedad }: PropiedadTabsDataProps) => {
	const propiedadesCaracteristicas = Object.entries(propiedad.caracteristicas);

	return <ShowDetailList propiedadList={propiedadesCaracteristicas} />;
};

export const PropiedadDetailsTab = ({ propiedad }: { propiedad: Propiedad }) => {
	const allTabs = [
		{ icon: <FileTextIcon />, label: "Detalle", data: <PropiedadDetalle propiedad={propiedad} /> },
		{
			icon: <LightbulbIcon />,
			label: "Servicios",
			data: <PropiedadServicios propiedad={propiedad} />,
		},
		{
			icon: <DoorClosedIcon />,
			label: "Ambientes",
			data: <PropiedadAmbientes propiedad={propiedad} />,
		},
		{
			icon: <ClipboardIcon />,
			label: "Caracteristicas",
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
		<div className="w-fit rounded-md overflow-hidden flex flex-col">
			<nav className="rounded-t-md border-b-[2.5px] border-secondary">
				<ul className="flex w-full list-none p-0 m-0 font-medium text-[14px]">
					{tabs.map((item) => (
						<motion.li
							key={item.label}
							initial={false}
							animate={{
								backgroundColor: item === selectedTab ? "var(--muted-secondary)" : "#eee0",
							}}
							className="rounded-md rounded-b-none w-full px-3.5 py-2.5 relative cursor-pointer flex items-center flex-1 select-none text-secondary font-medium text-base"
							onClick={() => setSelectedTab(item)}
						>
							<span className="mr-2">{item.icon}</span>
							<span>{item.label}</span>
							{item === selectedTab ? (
								<motion.div
									className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-primary"
									layoutId="underline"
									id="underline"
								/>
							) : null}
						</motion.li>
					))}
				</ul>
			</nav>
			<div className="flex py-4">
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
