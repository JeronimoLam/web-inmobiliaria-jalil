"use client";
import { usePropiedadesStore } from "../store/propiedades.store";

interface PropiedadesMapContainerProps {
	children: React.ReactNode;
}

export const PropiedadesMapContainer = ({ children }: PropiedadesMapContainerProps) => {
	const showListOnly = usePropiedadesStore((state) => state.showListOnly);

	const showMap = !showListOnly;

	return <>{showMap && <div className="h-full">{children}</div>}</>;
};
