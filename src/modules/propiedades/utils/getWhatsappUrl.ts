import { whatsappNumber } from "@/config/env";

interface WhatsappParams {
	number?: string;
	message?: string;
}

export function getWhatsappUrl({
	number = whatsappNumber,
	message = "¡Hola! Quisiera realizar una consulta.",
}: WhatsappParams) {
	if (!number) return null;
	return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
