import { PropiedadesScreen } from "@/modules/propiedades/screens/PropiedadesScreen";
import { PropiedadesService } from "@/modules/propiedades/services/propiedades-mock.service";
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
	const query = searchParams ? await searchParams : {};

	console.log(operacion, query);

	if (operacion !== "venta" && operacion !== "alquiler") {
		return notFound();
	}

	// const propiedades = await PropiedadesService.getPropiedades({
	// 	...query,
	// 	operacion,
	// });
	const propiedades = await PropiedadesService.getPropiedades();

	return <PropiedadesScreen propiedades={propiedades} operacion={operacion} />;
}
