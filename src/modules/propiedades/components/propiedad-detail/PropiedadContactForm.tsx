"use client";

import { useActionState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MailIcon } from "@/components/Icons";
import { sendContactForm } from "@/modules/propiedades/actions/sendContactForm.action";
import { Propiedad } from "../../types/propiedad.type";
import { buildPropiedadTitle } from "@/modules/propiedades/utils/propiedadPropertyBuilder";
import { Separator } from "@/components/ui/separator";
import { SuccessMessage } from "./SuccessMessage";
import { ContactFormFields } from "./ContactFormFields";
import { ContactButtons } from "./ContactButtons";

const initialState = { errors: {} as Record<string, string>, success: false };

export const PropiedadContactForm = ({ propiedad }: { propiedad: Propiedad }) => {
	const [state, formAction] = useActionState(sendContactForm, initialState);

	const estadoPublicacion = propiedad.precios[0].estado_publicacion.nombre;
	const title = buildPropiedadTitle(propiedad);

	const defaultMessage = `Hola, quiero consultar sobre la propiedad: ${propiedad.tipo_propiedad.value} en ${estadoPublicacion} #${propiedad.codigo} de ${title}, quisiera más información.`;

	return (
		<Card className="p-7 shadow-xs lg:sticky lg:top-22">
			{state.success ? (
				<SuccessMessage />
			) : (
				<form action={formAction}>
					<h2 className="font-semibold text-xl">Consultar por esta propiedad</h2>
					<ContactFormFields errors={state.errors} defaultMessage={defaultMessage} />

					<Button type="submit" className="w-full flex-1 py-7 font-semibold mt-5">
						<MailIcon className="size-5" />
						Contactar
					</Button>
				</form>
			)}
			<Separator className="my-6" />
			<ContactButtons defaultMessage={defaultMessage} estadoPublicacion={estadoPublicacion} />
		</Card>
	);
};
