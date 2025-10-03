"use server";
import z from "zod";
import { supabase } from "@/lib/supabaseClient";

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

	const emailBody = `
	<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
	  <h2 style="color: #1a73e8; margin: 0 0 15px 0;">
		📩 Hola! Tienes un nuevo mensaje sobre la consulta de una propiedad
	  </h2>
	  <hr style="border:none; border-top:1px solid #eee; margin:15px 0;" />
	  
	  <p>👤 <strong>Nombre y Apellido:</strong> ${result.data.nameSurname}</p>
	  <p>✉️ <strong>Email:</strong> ${result.data.email}</p>
	  <p>📞 <strong>Teléfono:</strong> ${result.data.phone}</p>
	  <p>💬 <strong>Mensaje:</strong></p>
	  <div style="padding: 12px 16px; background-color: #f7f7f7; border-radius: 6px; margin: 10px 0;">
		${result.data.message}
	  </div>
	  
	  <hr style="border:none; border-top:1px solid #eee; margin:15px 0;" />
	  <p style="font-size: 0.9em; color: #777; margin: 0 0 5px 0;">
		🔔 Este mensaje fue enviado desde el formulario en el detalle de la propiedad.
	  </p>
	  <p style="font-size: 0.85em; color: #999; margin: 0;">
		⚠️ Por favor, no respondas a este correo.<br/>
		Si querés ponerte en contacto con el usuario, escribile directamente a 
		<strong>${result.data.email}</strong>.
	  </p>
	</div>
  `;

	const { data, error } = await supabase.functions.invoke("send-mail", {
		method: "POST",
		body: {
			to: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
			subject: "Consulta de propiedad",
			html: emailBody,
		},
	});

	if (error || !data) {
		console.error("Error al enviar el email:", error.message);
		return { errors: { message: error.message }, success: false };
	}

	return { errors: {}, success: true };
}
