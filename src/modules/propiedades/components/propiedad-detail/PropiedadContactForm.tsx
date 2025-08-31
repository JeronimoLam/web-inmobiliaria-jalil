import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";

export const PropiedadContactForm = () => {
	return (
		<Card className="p-7 shadow-xs">
			<h2 className="font-semibold text-xl">Consultar por esta propiedad</h2>
			<form action="">
				<Input placeholder="Nombre y Apellido" className="mt-4" />
				<Input placeholder="Email" className="mt-4" />
				<div className="flex gap-2">
					<Input placeholder="Consulta" className="mt-4" />
					<Input placeholder="Teléfono" className="mt-4" />
				</div>
				<Textarea placeholder="Mensaje" className="mt-4" />
				<div className="flex gap-2 mt-5">
					<Button className="flex-1 py-6 font-semibold">
						<MailIcon className="size-5" />
						Contactar
					</Button>
					<Button variant="whatsapp" className="flex-1 py-6 font-semibold">
						<WhatsAppIcon className="size-6" />
						WhatsApp
					</Button>
				</div>
				<Button variant="outline" className="mt-3 w-full py-6">
					<PhoneIcon className="size-5" />
					<span className="font-semibold">Venta</span>
					<span>(0221) 421-7393 | 421-5498</span>
				</Button>
			</form>
		</Card>
	);
};
