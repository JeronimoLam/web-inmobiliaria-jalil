"use client";
import { PageContainer } from "@/components/layouts/PageContainer";
import { useParams } from "next/navigation";
import React from "react";

export const PropiedadDetailScreen = () => {
	const { id } = useParams<{ id: string }>();

	return (
		<div className="h-screen">
			<PageContainer>PropiedadDetailScreen {id}</PageContainer>
		</div>
	);
};
