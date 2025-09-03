import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MailIcon, PhoneIcon } from "@/components/Icons";
import PhoneInput from "@/components/ui/phone-input";
import { sendContactForm } from "@/modules/propiedades/actions/propiedad.action";
import { WhatsAppButton } from "@/modules/propiedades/components/propiedad-detail/WhatsappButton";
import { EstadoPublicacionEnum, Propiedad } from "../../types/propiedad.type";
import Link from "next/link";
import { buildPropiedadTitle } from "../../utils/propiedadPropertyBuilder";

export const PropiedadContactForm = ({ propiedad }: { propiedad: Propiedad }) => {
	const estadoPublicacion = propiedad.precios[0].estado_publicacion;

	const title = buildPropiedadTitle(propiedad);

	const phoneNumberFormat = (number: string) => {
		const num = number.slice(3);
		return num.replace(/(\d{3})/, "$1-");
	};

	return (
		<Card className="p-7 shadow-xs lg:sticky lg:top-22">
			<h2 className="font-semibold text-xl">Consultar por esta propiedad</h2>
			<form action={sendContactForm}>
				<Input
					type="text"
					name="name-surname"
					required
					placeholder="Nombre y Apellido"
					className="mt-4"
				/>
				<Input type="email" name="email" required placeholder="Email" className="mt-4" />
				<PhoneInput className="mt-4" name="phone" />
				<Textarea required name="message" placeholder="Mensaje" className="mt-4" />
				<div className="flex flex-col sm:flex-row gap-2 mt-5">
					<Button type="submit" className="flex-1 py-5 sm:py-7 font-semibold">
						<MailIcon className="size-5" />
						Contactar
					</Button>
					<WhatsAppButton
						defaultText={`Hola, quiero consultar sobre la propiedad #${propiedad.codigo} de ${title}, quisiera más información.`}
					/>
				</div>
				<Button
					type="button"
					variant="outline"
					className="mt-3 w-full sm:py-7 flex flex-col sm:flex-row py-10"
					asChild
				>
					{estadoPublicacion === EstadoPublicacionEnum.VENTA ? (
						<Link href={`tel:${process.env.TELEFONO_VENTA || ""}`} aria-label="telefono-venta">
							<span className="flex gap-1 font-semibold">
								<PhoneIcon className="size-5" /> Venta
							</span>
							<span className="text-break">
								(0221) {phoneNumberFormat(process.env.TELEFONO_VENTA || "")}
							</span>
						</Link>
					) : (
						<Link
							href={`tel:${process.env.TELEFONO_ALQUILER || ""}`}
							aria-label="telefono-alquiler"
						>
							<span className="flex gap-1 font-semibold">
								<PhoneIcon className="size-5" /> Alquiler
							</span>
							<span className="text-break">
								(0221) {phoneNumberFormat(process.env.TELEFONO_ALQUILER || "")}
							</span>
						</Link>
					)}
				</Button>
			</form>
		</Card>
	);
};
