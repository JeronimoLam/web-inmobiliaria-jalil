import { LIMITS } from "@/modules/propiedades/constants/filters.constants";
import { PropiedadesScreen } from "@/modules/propiedades/screens/PropiedadesScreen";
import { PropiedadesService } from "@/modules/propiedades/services/propiedades.service";
import { PropiedadFilters } from "@/modules/propiedades/types/filters.type";
import { notFound } from "next/navigation";

type Operacion = "venta" | "alquiler";
interface PropiedadesPageProps {
	params: Promise<{
		operacion: Operacion;
	}>;

	searchParams?: Promise<Record<string, string | undefined>>;
}

export default async function PropiedadesPage({ params, searchParams }: PropiedadesPageProps) {
	const { operacion } = await params;
	const queryParams = searchParams ? await searchParams : {};

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

	console.log(operacion, queryParams);

	if (operacion !== "venta" && operacion !== "alquiler") {
		return notFound();
	}

	const propiedades = await PropiedadesService.getAllPropiedades({
		operacion,
		filters: filters,
	});

	return <PropiedadesScreen propiedades={propiedades} operacion={operacion} />;
}
