"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PhoneInput from "@/components/ui/phone-input";

interface ContactFormFieldsProps {
	errors: Record<string, string>;
	defaultMessage: string;
}

export const ContactFormFields = ({ errors, defaultMessage }: ContactFormFieldsProps) => {
	return (
		<>
			<div className="mt-4">
				<Input type="text" name="name-surname" placeholder="Nombre y Apellido" required />
				{errors?.nameSurname && <p className="text-sm text-red-500 pt-1">{errors.nameSurname}</p>}
			</div>

			<div className="mt-4">
				<Input type="email" name="email" placeholder="Email" required />
				{errors?.email && <p className="text-sm text-red-500 pt-1">{errors.email}</p>}
			</div>

			<div className="mt-4">
				<PhoneInput name="phone" />
				{errors?.phone && <p className="text-sm text-red-500 pt-1">{errors.phone}</p>}
			</div>

			<div className="mt-4">
				<Textarea name="message" placeholder="Mensaje" required defaultValue={defaultMessage} />
				{errors?.message && <p className="text-sm text-red-500 pt-1">{errors.message}</p>}
			</div>
		</>
	);
};
