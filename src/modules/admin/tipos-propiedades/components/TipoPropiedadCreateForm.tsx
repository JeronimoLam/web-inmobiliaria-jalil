"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTransition } from "react";
import { createTipoPropiedad } from "../actions/create-tipo-propiedad.action";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/ui/Spinner";

export const TipoPropiedadCreateForm = () => {
	const [isPending, startTransition] = useTransition();

	const action = async (formData: FormData) => {
		startTransition(async () => {
			const response = await createTipoPropiedad(formData);
			if (response.success) {
				toast.success("Tipo de propiedad creado correctamente");
				redirect("/admin/tipos-propiedades");
			} else {
				toast.error(response.error);
			}
		});
	};

	return (
		<form action={action} className="space-y-4">
			<Label htmlFor="tipo">Nombre *</Label>
			<Input type="text" name="tipo" required />
			<Button type="submit" disabled={isPending}>
				{isPending ? (
					<div className="flex items-center gap-2">
						<Spinner color="#34344c" size={16} /> Creando tipo de propiedad...
					</div>
				) : (
					"Crear tipo de propiedad"
				)}
			</Button>
		</form>
	);
};
