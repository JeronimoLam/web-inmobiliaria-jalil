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
	// Filtrar solo los items con value true
	const filteredList = propiedadList.filter(([, value]) => value);
	return (
		<div>
			<ul className="grid grid-cols-1 sm:grid-flow-col sm:grid-rows-8 gap-x-10 gap-y-2">
				{filteredList.map(([key]) => (
					<li key={key} className="flex gap-2">
						<CircleCheckBigIcon className="text-primary" size={20} />
						<p className="whitespace-nowrap">{formatWord(key)}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

const PropiedadDetalle = ({ propiedad }: PropiedadTabsDataProps) => {
	return (
		<div>
			<ul className="grid grid-cols-1 sm:grid-flow-col sm:grid-rows-8 gap-x-10 gap-y-2">
				{!!propiedad.cant_ambientes && (
					<li className="flex gap-2">
						<CircleCheckBigIcon className="text-primary" size={20} />
						<p className="whitespace-nowrap flex gap-2">
							Cantidad de ambientes:{" "}
							<span className="font-semibold">{propiedad.cant_ambientes}</span>
						</p>
					</li>
				)}
				{!!propiedad.pisos && (
					<li className="flex gap-2">
						<CircleCheckBigIcon className="text-primary" size={20} />
						<p className="whitespace-nowrap flex gap-2">
							Pisos: <span className="font-semibold">{propiedad.pisos}</span>
						</p>
					</li>
				)}
				{!!propiedad.cocheras && (
					<li className="flex gap-2">
						<CircleCheckBigIcon className="text-primary" size={20} />
						<p className="whitespace-nowrap flex gap-2">
							Cocheras: <span className="font-semibold">{propiedad.cocheras}</span>
						</p>
					</li>
				)}
				{!!propiedad.antiguedad && (
					<li className="flex gap-2">
						<CircleCheckBigIcon className="text-primary" size={20} />
						<p className="whitespace-nowrap flex gap-2">
							Antigüedad: <span className="font-semibold">{propiedad.antiguedad}</span>
						</p>
					</li>
				)}
				{!!propiedad.superficie_cubierta && (
					<li className="flex gap-2">
						<CircleCheckBigIcon className="text-primary" size={20} />
						<p className="whitespace-nowrap flex gap-2">
							Superficie Cubierta:{" "}
							<span className="font-semibold">{propiedad.superficie_cubierta}</span>
						</p>
					</li>
				)}
				{!!propiedad.superficie_terreno && (
					<li className="flex gap-2">
						<CircleCheckBigIcon className="text-primary" size={20} />
						<p className="whitespace-nowrap flex gap-2">
							Superficie Terreno:{" "}
							<span className="font-semibold">{propiedad.superficie_terreno}</span>
						</p>
					</li>
				)}
				{!!propiedad.superficie_total_construida && (
					<li className="flex gap-2">
						<CircleCheckBigIcon className="text-primary" size={20} />
						<p className="whitespace-nowrap flex gap-2">
							Superficie Total Construida:{" "}
							<span className="font-semibold">{propiedad.superficie_total_construida}</span>
						</p>
					</li>
				)}
				{!!propiedad.medida_frontal && (
					<li className="flex gap-2">
						<CircleCheckBigIcon className="text-primary" size={20} />
						<p className="whitespace-nowrap flex gap-2">
							Medida frontal: <span className="font-semibold">{propiedad.medida_frontal}</span>
						</p>
					</li>
				)}
				{!!propiedad.medida_profundidad && (
					<li className="flex gap-2">
						<CircleCheckBigIcon className="text-primary" size={20} />
						<p className="whitespace-nowrap flex gap-2">
							Medida profundidad:{" "}
							<span className="font-semibold">{propiedad.medida_profundidad}</span>
						</p>
					</li>
				)}
				{!!propiedad.cantidad_toilettes && (
					<li className="flex gap-2">
						<CircleCheckBigIcon className="text-primary" size={20} />
						<p className="whitespace-nowrap flex gap-2">
							Cantidad de toilettes:{" "}
							<span className="font-semibold">{propiedad.cantidad_toilettes}</span>
						</p>
					</li>
				)}
				{!!propiedad.cantidad_banos && (
					<li className="flex gap-2">
						<CircleCheckBigIcon className="text-primary" size={20} />
						<p className="whitespace-nowrap flex gap-2">
							Cantidad de baños: <span className="font-semibold">{propiedad.cantidad_banos}</span>
						</p>
					</li>
				)}
				{!!propiedad.dormitorios && (
					<li className="flex gap-2">
						<CircleCheckBigIcon className="text-primary" size={20} />
						<p className="whitespace-nowrap flex gap-2">
							Dormitorios: <span className="font-semibold">{propiedad.dormitorios}</span>
						</p>
					</li>
				)}
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
			<nav className="rounded-t-md">
				<ul className="grid grid-cols-2 grid-rows-2 md:flex border-b-[2.5px] border-secondary w-full list-none p-0 m-0 font-medium text-[14px]">
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
									className="hidden md:block absolute top-full left-0 right-0 h-[2.5px] md:h-[2px] bg-primary z-50"
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
