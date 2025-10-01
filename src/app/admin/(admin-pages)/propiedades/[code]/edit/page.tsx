import { AdminHeader } from "@/modules/admin/components/AdminHeader";
import { getPropiedadByCode } from "@/modules/admin/propiedades/services/get-propiedad-by-code.service";
import { EditPropiedadForm } from "@/modules/admin/propiedades/components/EditPropiedadForm";
import { notFound } from "next/navigation";

interface PropiedadAdminEditPageProps {
	params: Promise<{
		code: string;
	}>;
}

export default async function PropiedadAdminEditPage({ params }: PropiedadAdminEditPageProps) {
	const { code } = await params;

	const propiedad = await getPropiedadByCode(code);

	if (!propiedad) {
		return notFound();
	}

	return (
		<>
			<AdminHeader title="Editar Propiedad" />
			<EditPropiedadForm propiedad={propiedad} />
		</>
	);
}
