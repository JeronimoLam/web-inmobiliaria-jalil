import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import PhoneInput from "@/components/ui/phone-input";

export const PropiedadContactForm = () => {
	return (
		<Card className="p-7 shadow-xs lg:sticky lg:top-22">
			<h2 className="font-semibold text-xl">Consultar por esta propiedad</h2>
			<form action="">
				<Input placeholder="Nombre y Apellido" className="mt-4" />
				<Input placeholder="Email" className="mt-4" />
				<PhoneInput className="mt-4" />
				<Textarea placeholder="Mensaje" className="mt-4" />
				<div className="flex flex-col sm:flex-row gap-2 mt-5">
					<Button className="flex-1 py-5 sm:py-7 font-semibold">
						<MailIcon className="size-5" />
						Contactar
					</Button>
					<Button variant="whatsapp" className="flex-1 py-5 sm:py-7 font-semibold">
						<WhatsAppIcon className="size-6" />
						WhatsApp
					</Button>
				</div>
				<Button variant="outline" className="mt-3 w-full sm:py-7 flex flex-col sm:flex-row py-10">
					<span className="flex gap-1 font-semibold">
						<PhoneIcon className="size-5" /> Venta
					</span>
					<span className="text-break">(0221) 421-7393 | 421-5498</span>
				</Button>
			</form>
		</Card>
	);
};
