import { AdminHeader } from "@/modules/admin/components/AdminHeader";
import { PropiedadForm } from "@/modules/admin/propiedades/components/PropiedadForm";

export default function NuevaPropiedadAdminPage() {
	return (
		<>
			<AdminHeader title="Nueva Propiedad" />
			<PropiedadForm context="create" />
		</>
	);
}
