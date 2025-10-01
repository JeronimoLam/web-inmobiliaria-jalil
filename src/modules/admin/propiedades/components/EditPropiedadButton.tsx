import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { Edit } from "lucide-react";

export const EditPropiedadButton = ({ propiedad }: { propiedad: Propiedad }) => {
	return (
		<Link href={`/admin/propiedades/${propiedad.codigo}/edit`}>
			<Button variant="ghost" size="sm" title="Editar">
				<Edit className="h-4 w-4" />
			</Button>
		</Link>
	);
};
