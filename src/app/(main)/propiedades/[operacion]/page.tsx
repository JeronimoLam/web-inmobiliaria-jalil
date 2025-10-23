import { FiltersService } from "@/modules/filters/services/filters.service";
import { PropiedadFilters } from "@/modules/filters/types/filters.type";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PropiedadesContainer from "@/modules/propiedades/components/server/PropiedadesContainer.server";
import SubNavbar from "@/modules/propiedades/components/SubNavbar";
import { PropiedadesListSkeleton } from "@/modules/propiedades/components/PropiedadesListSkeleton";
import { Metadata } from "next";
import { generatePropiedadesMetadata } from "@/config/seo/metadata";

interface PropiedadesPageProps {
	params: Promise<{ operacion: string }>;
	searchParams?: Promise<Record<string, string | undefined>>;
}

export async function generateMetadata({
	params,
	searchParams,
}: PropiedadesPageProps): Promise<Metadata> {
	return generatePropiedadesMetadata({ params, searchParams });
}

export default async function PropiedadesPage({ params, searchParams }: PropiedadesPageProps) {
	const { operacion } = await params;
	const queryParams = searchParams ? await searchParams : {};

	if (operacion !== "venta" && operacion !== "alquiler") {
		return notFound();
	}

	const filtersParams: PropiedadFilters = {
		tipoPropiedad: queryParams.tipoPropiedad || undefined,
		localidad: queryParams.localidad || undefined,
		dormitorios: queryParams.dormitorios ? parseInt(queryParams.dormitorios) : undefined,
		precioMin: queryParams.precioMin ? parseInt(queryParams.precioMin) : undefined,
		precioMax: queryParams.precioMax ? parseInt(queryParams.precioMax) : undefined,
		divisa: queryParams.divisa === "USD" ? "USD" : "ARS",
		caracteristicas: queryParams.caracteristicas?.split(",").filter(Boolean) || undefined,
		ambientes: queryParams.ambientes?.split(",").filter(Boolean) || undefined,
		servicios: queryParams.servicios?.split(",").filter(Boolean) || undefined,
		superficieMin: queryParams.superficieMin ? parseInt(queryParams.superficieMin) : undefined,
		superficieMax: queryParams.superficieMax ? parseInt(queryParams.superficieMax) : undefined,
		banos: queryParams.banos ? parseInt(queryParams.banos) : undefined,
		ambientesContador: queryParams.ambientesContador
			? parseInt(queryParams.ambientesContador)
			: undefined,
		pisos: queryParams.pisos ? parseInt(queryParams.pisos) : undefined,
	};

	const paginationParams = {
		page: queryParams.page && parseInt(queryParams.page),
		limit: queryParams.limit && parseInt(queryParams.limit),
	};

	const filterData = await FiltersService.getAll();

	return (
		<div className="flex flex-col w-full">
			<SubNavbar filterData={filterData} />
			<div className="flex flex-col pt-[80px]">
				<Suspense fallback={<PropiedadesListSkeleton count={5} />}>
					<PropiedadesContainer
						operacion={operacion}
						filtersParams={filtersParams}
						paginationParams={paginationParams}
					/>
				</Suspense>
			</div>
		</div>
	);
}
