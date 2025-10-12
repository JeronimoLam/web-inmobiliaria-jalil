import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CREATE_PROPIEDAD_DEFAULT_VALUES } from "../constants/create-propiedad-default-values";
import { type CreatePropiedad } from "../types/create-propiedad.types";
import { transformPropiedadToFormData } from "../utils/transformPropiedadToFormData";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";

interface UsePropiedadFormProps {
	context: "create" | "edit";
	propiedad?: Propiedad;
}

export const usePropiedadForm = ({ context, propiedad }: UsePropiedadFormProps) => {
	const formMethods = useForm<CreatePropiedad>();

	useEffect(() => {
		if (context === "create") {
			formMethods.reset(CREATE_PROPIEDAD_DEFAULT_VALUES);
		} else if (propiedad) {
			const defaultValues = transformPropiedadToFormData(propiedad);
			formMethods.reset(defaultValues);
		}
	}, [context, propiedad, formMethods]);

	const { handleSubmit } = formMethods;

	return {
		handleSubmit,
		formMethods,
	};
};
