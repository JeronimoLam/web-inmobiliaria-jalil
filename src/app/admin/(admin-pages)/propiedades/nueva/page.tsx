import { AdminHeader } from "@/modules/admin/components/AdminHeader";
import { CreatePropiedadForm } from "@/modules/admin/propiedades/components/CreatePropiedadForm";

export default function NuevaPropiedadAdminPage() {
	return (
		<>
			<AdminHeader title="Nueva Propiedad" />
			<CreatePropiedadForm />
		</>
	);
}
