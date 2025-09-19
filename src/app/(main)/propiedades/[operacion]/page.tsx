import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";
import { PropiedadesScreen } from "@/modules/propiedades/screens/PropiedadesScreen";
import { FiltersService } from "@/modules/filters/services/filters.service";
import { PropiedadFilters } from "@/modules/filters/types/filters.type";
import { notFound } from "next/navigation";
import { getPropiedades } from "@/modules/propiedades/services/get-propiedades.service";

interface PropiedadesPageProps {
	params: Promise<{ operacion: string }>;
	searchParams?: Promise<Record<string, string | undefined>>;
}

export default async function PropiedadesPage({ params, searchParams }: PropiedadesPageProps) {
	const { operacion } = await params;
	const queryParams = searchParams ? await searchParams : {};

	if (operacion !== "venta" && operacion !== "alquiler") {
		return notFound();
	}

	const filters: PropiedadFilters = {
		tipoPropiedad: queryParams.tipoPropiedad || undefined,
		localidad: queryParams.localidad || undefined,
		dormitorios: queryParams.dormitorios ? parseInt(queryParams.dormitorios) : undefined,
		precioMin: queryParams.precioMin ? parseInt(queryParams.precioMin) : undefined,
		precioMax: queryParams.precioMax ? parseInt(queryParams.precioMax) : undefined,
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

	const [propiedades, filterData] = await Promise.all([
		getPropiedades({
			operacion: operacion === "venta" ? OperacionesEnum.VENTA : OperacionesEnum.ALQUILER,
			filters,
			pagination: {
				page: queryParams.page ? parseInt(queryParams.page) : 1,
				limit: queryParams.limit ? parseInt(queryParams.limit) : 5,
			},
		}),
		FiltersService.getAll(),
	]);

	return <PropiedadesScreen propiedades={propiedades.data} filterData={filterData} />;
}
