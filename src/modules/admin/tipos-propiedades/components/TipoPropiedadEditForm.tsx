"use client";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TipoPropiedad } from "@/modules/filters/types/filters.type";
import { updateTipoPropiedad } from "../actions/update-tipo-propiedad.action";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/ui/Spinner";

export const TipoPropiedadEditForm = ({ tipoPropiedad }: { tipoPropiedad: TipoPropiedad }) => {
	const [isPending, startTransition] = useTransition();

	const action = async (formData: FormData) => {
		startTransition(async () => {
			const response = await updateTipoPropiedad(formData);
			if (response.success) {
				toast.success("Tipo de propiedad actualizado correctamente");
				redirect("/admin/tipos-propiedades");
			} else {
				toast.error(response.error);
			}
		});
	};
	return (
		<form action={action} className="space-y-4">
			<input type="hidden" name="id" value={tipoPropiedad.id} />
			<Label htmlFor="tipo">Nombre *</Label>
			<Input type="text" name="tipo" defaultValue={tipoPropiedad.tipo} required />
			<Button type="submit" disabled={isPending}>
				{isPending ? (
					<div className="flex items-center gap-2">
						<Spinner color="#34344c" size={16} /> Guardando cambios...
					</div>
				) : (
					"Guardar cambios"
				)}
			</Button>
		</form>
	);
};
