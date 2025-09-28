import { AdminHeader } from "@/modules/admin/components/AdminHeader";
import { PropiedadDetailAdmin } from "@/modules/admin/propiedades/components/PropiedadDetailAdmin";
import { getPropiedadByCode } from "@/modules/admin/propiedades/services/get-propiedad-by-code.service";
import { buildPropiedadTitle } from "@/modules/propiedades/utils/propiedadPropertyBuilder";
import { notFound } from "next/navigation";

interface PropiedadAdminPageProps {
	params: Promise<{
		code: string;
	}>;
}

export default async function PropiedadAdminPage({ params }: PropiedadAdminPageProps) {
	const { code } = await params;

	const propiedad = await getPropiedadByCode(code);

	if (!propiedad) {
		return notFound();
	}

	const title = buildPropiedadTitle(propiedad);

	return (
		<>
			<AdminHeader title={`Propiedad #${propiedad.codigo} ${title}`} />
			<PropiedadDetailAdmin propiedad={propiedad} />
		</>
	);
}
