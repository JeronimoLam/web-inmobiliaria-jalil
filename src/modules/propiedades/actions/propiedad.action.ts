"use server";
import z from "zod";

const contactFormSchema = z.object({
	nameSurname: z.string().min(2, "Debe tener al menos 2 caracteres").max(100),
	email: z.email("Email inválido"),
	phone: z.string().min(10, "Número demasiado corto").max(15),
	message: z.string().min(10, "El mensaje es muy corto").max(500),
});

export async function sendContactForm(_prevState: unknown, formData: FormData) {
	const rawFormData = {
		nameSurname: formData.get("name-surname"),
		email: formData.get("email"),
		phone: (formData.get("phone") as string)?.replace(/\s+/g, ""),
		message: formData.get("message"),
	};

	const result = contactFormSchema.safeParse(rawFormData);

	if (!result.success) {
		const errors: Record<string, string> = {};
		result.error.issues.forEach((issue) => {
			errors[issue.path[0] as string] = issue.message;
		});
		return { errors, success: false };
	}

	console.log("Form data válido:", result.data);
	return { errors: {}, success: true };
}
