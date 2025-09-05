import { PropiedadesScreen } from "@/modules/propiedades/screens/PropiedadesScreen";
import { PropiedadesService } from "@/modules/propiedades/services/propiedades-mock.service";

export default async function AlquilerPage() {
	const propiedades = await PropiedadesService.getPropiedades();
	return <PropiedadesScreen propiedades={propiedades} />;
}
