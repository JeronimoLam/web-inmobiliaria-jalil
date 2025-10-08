"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createLocalidad } from "@/modules/admin/localidades/actions/create-localidad.action";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { Spinner } from "@/components/ui/Spinner";

export const LocalidadCreateForm = () => {
	const [isPending, startTransition] = useTransition();

	const action = async (formData: FormData) => {
		startTransition(async () => {
			const response = await createLocalidad(formData);
			if (response.success) {
				toast.success("Localidad creada correctamente");
				redirect("/admin/localidades");
			} else {
				toast.error(response.error);
			}
		});
	};

	return (
		<form action={action} className="space-y-4">
			<Label htmlFor="nombre">Nombre *</Label>
			<Input type="text" name="nombre" required />
			<Button type="submit" disabled={isPending}>
				{isPending ? (
					<div className="flex items-center gap-2">
						<Spinner color="#34344c" size={16} /> Creando localidad...
					</div>
				) : (
					"Crear localidad"
				)}
			</Button>
		</form>
	);
};
