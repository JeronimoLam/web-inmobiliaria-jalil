import { AdminHeader } from "@/modules/admin/components/AdminHeader";
import { NuevaPropiedadForm } from "@/modules/admin/propiedades/components/NuevaPropiedadForm";
import React from "react";

export default function NuevaPropiedadAdminPage() {
	return (
		<>
			<AdminHeader title="Nueva Propiedad" />
			<NuevaPropiedadForm />
		</>
	);
}
