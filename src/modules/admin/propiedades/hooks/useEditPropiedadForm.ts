import { useForm } from "react-hook-form";
import { type CreatePropiedad } from "../types/create-propiedad.types";
import { transformPropiedadToFormData } from "../utils/transformPropiedadToFormData";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";

interface UseEditPropiedadFormProps {
	propiedad: Propiedad;
}

export const useEditPropiedadForm = ({ propiedad }: UseEditPropiedadFormProps) => {
	const defaultValues = transformPropiedadToFormData(propiedad);

	const formMethods = useForm<CreatePropiedad>({
		defaultValues,
		mode: "onSubmit",
	});

	const { handleSubmit } = formMethods;

	return {
		handleSubmit,
		formMethods,
	};
};
