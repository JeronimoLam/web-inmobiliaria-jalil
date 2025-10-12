"use server";
import { supabase } from "@/lib/supabaseClient";
import z from "zod";

const tasacionesFormSchema = z.object({
	nameSurname: z.string().min(2, "Debe tener al menos 2 caracteres").max(100),
	operation: z
		.string()
		.min(1, "Debe seleccionar una operación")
		.refine((val) => val === "vender" || val === "alquilar"),
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

	const emailBody = `
	<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
	  <h2 style="color: #1a73e8; margin-bottom: 15px;">📐 Nueva solicitud de tasación de propiedad</h2>
	  <hr style="border:none; border-top:1px solid #eee; margin:15px 0;" />
  
	  <p>👤 <strong>Nombre y Apellido:</strong> ${result.data.nameSurname}</p>
	  <p>📍 <strong>Dirección de la propiedad:</strong> ${result.data.address}</p>
	  <p>📑 <strong>Tipo de operación:</strong> ${
			result.data.operation === "vender" ? "🏠 Vender su propiedad" : "🔑 Alquilar su propiedad"
		}</p>
	  
	  <p>✉️ <strong>Email:</strong> ${result.data.email}</p>
	  <p>📞 <strong>Teléfono:</strong> ${result.data.phone}</p>
	  <p>☎️ <strong>Prefiere que lo llamen:</strong> ${
			result.data.prefieroQueMeLlamen ? "Sí" : "No"
		}</p>
  
	  <p>💬 <strong>Mensaje:</strong></p>
	  <div style="padding: 12px 16px; background-color: #f7f7f7; border-radius: 6px; margin: 10px 0;">
		${result.data.message}
	  </div>
  
	  <hr style="border:none; border-top:1px solid #eee; margin:15px 0;" />
	  <p style="font-size: 0.9em; color: #777;">
		🔔 Este mensaje fue enviado desde el formulario de tasación en tu sitio web.
	  </p>
	  <p style="font-size: 0.85em; color: #999; margin-top: 10px;">
		⚠️ Por favor, no respondas a este correo.<br/>
		Para contactar al cliente, escribile directamente a <strong>${result.data.email}</strong>.
	  </p>
	</div>
  `;

	const { data, error } = await supabase.functions.invoke("send-mail", {
		method: "POST",
		body: {
			to: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
			subject: "Tasación de propiedad",
			html: emailBody,
		},
	});

	const emptyErrors: TasacionesFormErrors = {
		nameSurname: "",
		address: "",
		email: "",
		phone: "",
		message: "",
	};

	if (error || !data) {
		console.error("Error al enviar el email:", error.message);
		return { errors: emptyErrors, success: false };
	}

	return { errors: {} as TasacionesFormErrors, success: true };
}
