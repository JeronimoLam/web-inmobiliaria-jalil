import { WhatsAppIcon } from "@/components/Icons";
import { getWhatsappUrl } from "@/lib/getWhatsappUrl";

const whatsappUrl = getWhatsappUrl({
	message: "",
});

export default function WhatsappFloatingButton() {
	if (!whatsappUrl) return null;

	return (
		<a
			href={whatsappUrl}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="WhatsApp"
			className="fixed bottom-4 md:bottom-6 xl:bottom-8 right-3 md:right-6 xl:right-8 z-[1000] bg-[#25D366] rounded-full size-15 flex items-center justify-center shadow-lg transition-shadow duration-200 hover:shadow-xl"
		>
			<WhatsAppIcon width={32} height={32} />
		</a>
	);
}
