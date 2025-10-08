import { AdminHeader } from "@/modules/admin/components/AdminHeader";
import { getPropiedadByCode } from "@/modules/admin/propiedades/services/get-propiedad-by-code.service";
import { notFound } from "next/navigation";
import { PropiedadForm } from "@/modules/admin/propiedades/components/PropiedadForm";

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
			<PropiedadForm context="edit" propiedad={propiedad} />
		</>
	);
}
