import { useForm } from "react-hook-form";
import { CREATE_PROPIEDAD_DEFAULT_VALUES } from "../constants/CreatePropiedadDefaultValues";
import { type CreatePropiedad } from "../types/create-propiedad.types";

export const useCreatePropiedadForm = () => {
	const formMethods = useForm<CreatePropiedad>({
		defaultValues: CREATE_PROPIEDAD_DEFAULT_VALUES,
		mode: "onSubmit",
	});

	const { handleSubmit } = formMethods;

	return {
		handleSubmit,
		formMethods,
	};
};
