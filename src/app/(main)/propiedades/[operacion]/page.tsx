import { PropiedadesScreen } from "@/modules/propiedades/screens/PropiedadesScreen";
import { PropiedadesService } from "@/modules/propiedades/services/propiedades-mock.service";

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

	// Hacemos el fetch pansandole que operacion queremos filtrar (venta o alquiler)
	const propiedades = await PropiedadesService.getPropiedades();

	return <PropiedadesScreen propiedades={propiedades} operacion={operacion} />;
}
