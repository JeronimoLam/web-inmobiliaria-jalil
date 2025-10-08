"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Localidad } from "@/modules/filters/types/filters.type";
import React from "react";
import { updateLocalidad } from "../actions/update-localidad.action";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export const LocalidadEditForm = ({ localidad }: { localidad: Localidad }) => {
	const action = async (formData: FormData) => {
		const response = await updateLocalidad(formData);
		if (response.success) {
			toast.success("Localidad actualizada correctamente");
			redirect("/admin/localidades");
		} else {
			toast.error(response.error);
		}
	};
	return (
		<form action={action} className="space-y-4">
			<input type="hidden" name="id" value={localidad.id} />
			<Label htmlFor="nombre">Nombre *</Label>
			<Input type="text" name="nombre" defaultValue={localidad.nombre} required />
			<Button type="submit">Guardar</Button>
		</form>
	);
};
