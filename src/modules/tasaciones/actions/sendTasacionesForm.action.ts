"use server";
import z from "zod";

const tasacionesFormSchema = z.object({
	nameSurname: z.string().min(2, "Debe tener al menos 2 caracteres").max(100),
	operation: z.string().min(1, "Debe seleccionar una operación"),
	address: z.string().min(2, "Debe tener al menos 2 caracteres").max(100),
	email: z.email("Email inválido"),
	phone: z.string().min(10, "Número demasiado corto").max(15),
	message: z.string().min(10, "El mensaje es muy corto").max(500),
	prefieroQueMeLlamen: z.boolean().optional(),
});

export type TasacionesFormErrors = {
	nameSurname: string;
	address: string;
	email: string;
	phone: string;
	message: string;
};

export async function sendTasacionesForm(_prevState: unknown, formData: FormData) {
	const rawFormData = {
		nameSurname: (formData.get("name-surname") as string) || "",
		operation: (formData.get("operation") as string) || "alquilar",
		address: (formData.get("address") as string) || "",
		email: (formData.get("email") as string) || "",
		phone: (formData.get("phone") as string)?.replace(/\s+/g, "") || "",
		message: (formData.get("message") as string) || "",
		prefieroQueMeLlamen: formData.get("prefiero-que-me-llamen") === "on",
	};

	const result = tasacionesFormSchema.safeParse(rawFormData);

	if (!result.success) {
		const errors: TasacionesFormErrors = {
			nameSurname: "",
			address: "",
			email: "",
			phone: "",
			message: "",
		};
		result.error.issues.forEach((issue) => {
			errors[issue.path[0] as keyof TasacionesFormErrors] = issue.message;
		});
		return {
			errors,
			success: false,
			formData: rawFormData,
		};
	}

	console.log("✅ Form data válido:", result.data);
	console.log("==========================================");
	return { errors: {} as TasacionesFormErrors, success: true };
}
