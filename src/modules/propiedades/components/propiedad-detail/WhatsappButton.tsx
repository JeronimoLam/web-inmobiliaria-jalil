import { WhatsAppIcon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { getWhatsappUrl } from "@/modules/propiedades/utils/getWhatsappUrl";

const whatsappUrl = getWhatsappUrl({
	message: "\nmaiL@mail.com \nnombre Apellido \nkjashdkajshdkajshdakjhdkajhdakjhdask",
});

export const WhatsAppButton = () => {
	return (
		<Button asChild variant="whatsapp" className="flex-1 py-5 sm:py-7 font-semibold">
			<a href={whatsappUrl || "#"} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
				<WhatsAppIcon className="size-6" />
				WhatsApp
			</a>
		</Button>
	);
};
