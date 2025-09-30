import { useForm } from "react-hook-form";
import { CREATE_PROPIEDAD_DEFAULT_VALUES } from "../constants/CreatePropiedadDefaultValues";
import { type CreatePropiedad } from "../types/create-propiedad.types";

export const useCreatePropiedadForm = () => {
	const formMethods = useForm<CreatePropiedad>({
		defaultValues: CREATE_PROPIEDAD_DEFAULT_VALUES,
		mode: "onChange",
	});

	const { handleSubmit, formState } = formMethods;

	const areCoordinatesValid = (coordinates: [number, number]) => {
		return coordinates[0] !== 0 || coordinates[1] !== 0;
	};

	const isFormValid = () => {
		const values = formMethods.getValues();
		const hasCoordinates = areCoordinatesValid(values.propiedad.map_location.coordinates);
		const hasRequiredFields =
			values.propiedad.calle &&
			values.propiedad.tipo_propiedad &&
			values.propiedad.descripcion &&
			values.localidad_name;
		const hasPrices = values.precios.length > 0;

		return hasCoordinates && hasRequiredFields && hasPrices && formState.isValid;
	};

	return {
		handleSubmit,
		formMethods,
		isFormValid,
	};
};
