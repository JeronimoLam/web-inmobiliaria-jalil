"use server";

import z from "zod";

const contactFormSchema = z.object({
	nameSurname: z.string().min(2).max(100),
	email: z.email(),
	phone: z.string().min(10).max(15),
	message: z.string().min(10).max(500),
});

const validateContactForm = (data: unknown) => {
	return contactFormSchema.safeParse(data);
};

export const sendContactForm = async (formData: FormData) => {
	const rawFormData = {
		nameSurname: formData.get("name-surname"),
		email: formData.get("email"),
		phone: (formData.get("phone") as string)?.replace(/\s+/g, ""),
		message: formData.get("message"),
	};

	const validationResult = validateContactForm(rawFormData);
	if (!validationResult.success) {
		console.error("Validation failed:", validationResult.error);
		return;
	}

	console.log(validationResult.data);
};
