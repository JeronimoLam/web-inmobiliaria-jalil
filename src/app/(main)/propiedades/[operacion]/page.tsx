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
		operacion,
		tipoPropiedad: queryParams.tipoPropiedad || "",
		localidad: queryParams.localidad || "",
		dormitorios: parseInt(queryParams.dormitorios || "0"),
		precioMin: parseInt(queryParams.precioMin || "0") || LIMITS.MIN_PRECIO,
		precioMax: parseInt(queryParams.precioMax || "0") || LIMITS.MAX_PRECIO,
		caracteristicas: queryParams.caracteristicas?.split(",") || [],
		ambientes: queryParams.ambientes?.split(",") || [],
		servicios: queryParams.servicios?.split(",") || [],
		superficieMin: queryParams.superficieMin || "",
		superficieMax: queryParams.superficieMax || "",
		banos: parseInt(queryParams.banos || "0"),
		ambientesContador: parseInt(queryParams.ambientesContador || "0"),
		niveles: parseInt(queryParams.niveles || "0"),
	};

	console.log(operacion, queryParams);

	if (operacion !== "venta" && operacion !== "alquiler") {
		return notFound();
	}

	// const propiedades = await PropiedadesService.getPropiedades({
	// 	...query,
	// 	operacion,
	// });
	const propiedades = await PropiedadesService.getPropiedades(filters);

	return <PropiedadesScreen propiedades={propiedades} operacion={operacion} />;
}
