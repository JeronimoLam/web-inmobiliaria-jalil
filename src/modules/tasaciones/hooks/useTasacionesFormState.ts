import { useState } from "react";
import { type TasacionesFormErrors } from "@/modules/tasaciones/actions/sendTasacionesForm.action";

type TasacionesFormData = {
	nameSurname: string;
	operation: string;
	address: string;
	email: string;
	phone: string;
	message: string;
	prefieroQueMeLlamen: boolean;
};

type FormState = {
	errors: TasacionesFormErrors;
	success: boolean;
	formData: TasacionesFormData;
};

export const useTasacionesFormState = () => {
	const [formValues, setFormValues] = useState<TasacionesFormData>({
		nameSurname: "",
		operation: "alquilar",
		address: "",
		email: "",
		phone: "",
		message: "",
		prefieroQueMeLlamen: false,
	});

	const initialState: FormState = {
		errors: {
			nameSurname: "",
			address: "",
			email: "",
			phone: "",
			message: "",
		},
		success: false,
		formData: {
			nameSurname: "",
			operation: "alquilar",
			address: "",
			email: "",
			phone: "",
			message: "",
			prefieroQueMeLlamen: false,
		},
	};

	return {
		formValues,
		setFormValues,
		initialState,
	};
};
