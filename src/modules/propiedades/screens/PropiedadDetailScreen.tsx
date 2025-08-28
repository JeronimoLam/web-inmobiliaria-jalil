"use client";
import { PageContainer } from "@/components/layouts/PageContainer";
import { useParams } from "next/navigation";
import React from "react";

export const PropiedadDetailScreen = () => {
	const { propiedadId } = useParams<{ propiedadId: string }>();

	return (
		<div className="h-screen">
			<PageContainer>PropiedadDetailScreen {propiedadId}</PageContainer>
		</div>
	);
};
