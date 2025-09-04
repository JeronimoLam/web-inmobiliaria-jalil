interface WhatsappParams {
	number?: string;
	message: string;
}

export function getWhatsappUrl({
	number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
	message = "",
}: WhatsappParams) {
	if (!number) return null;
	return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
