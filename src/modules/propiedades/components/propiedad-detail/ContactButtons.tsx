"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PhoneIcon } from "@/components/Icons";
import { WhatsAppButton } from "./WhatsappButton";
import { OperacionesEnum } from "../../enums/propiedades.enum";

interface ContactButtonsProps {
	defaultMessage: string;
	estadoPublicacion: OperacionesEnum;
}

export const ContactButtons = ({ defaultMessage, estadoPublicacion }: ContactButtonsProps) => {
	const phoneNumberFormat = (number: string) => {
		const num = number.slice(3);
		return num.replace(/(\d{3})/, "$1-");
	};

	return (
		<div className="flex flex-col gap-2 w-full">
			<WhatsAppButton defaultText={defaultMessage} />
			<Button
				type="button"
				variant="outline"
				className="sm:py-7 flex flex-col sm:flex-row py-9"
				asChild
			>
				{estadoPublicacion === OperacionesEnum.VENTA ? (
					<Link
						href={`tel:${process.env.NEXT_PUBLIC_TELEFONO_VENTA || ""}`}
						aria-label="telefono-venta"
					>
						<span className="flex gap-1 font-semibold">
							<PhoneIcon className="size-5" /> Venta
						</span>
						<span className="text-break">
							(0221) {phoneNumberFormat(process.env.NEXT_PUBLIC_TELEFONO_VENTA || "")}
						</span>
					</Link>
				) : (
					<Link
						href={`tel:${process.env.NEXT_PUBLIC_TELEFONO_ALQUILER || ""}`}
						aria-label="telefono-alquiler"
					>
						<span className="flex gap-1 font-semibold">
							<PhoneIcon className="size-5" /> Alquiler
						</span>
						<span className="text-break">
							(0221) {phoneNumberFormat(process.env.NEXT_PUBLIC_TELEFONO_ALQUILER || "")}
						</span>
					</Link>
				)}
			</Button>
		</div>
	);
};
