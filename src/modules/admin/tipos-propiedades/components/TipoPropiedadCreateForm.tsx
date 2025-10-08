"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { createTipoPropiedad } from "../actions/create-tipo-propiedad.action";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export const TipoPropiedadCreateForm = () => {
	const action = async (formData: FormData) => {
		const response = await createTipoPropiedad(formData);
		if (response.success) {
			toast.success("Tipo de propiedad creado correctamente");
			redirect("/admin/tipos-propiedades");
		} else {
			toast.error(response.error);
		}
	};
	return (
		<form action={action} className="space-y-4">
			<Label htmlFor="tipo">Nombre *</Label>
			<Input type="text" name="tipo" required />
			<Button type="submit">Guardar</Button>
		</form>
	);
};
