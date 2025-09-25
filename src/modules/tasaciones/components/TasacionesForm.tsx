"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PhoneInput from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useActionState, useEffect } from "react";
import { sendTasacionesForm } from "@/modules/tasaciones/actions/sendTasacionesForm.action";
import { SuccessMessage } from "@/modules/propiedades/components/propiedad-detail/SuccessMessage";
import Link from "next/link";
import { useTasacionesFormState } from "../hooks/useTasacionesFormState";

export const TasacionesForm = () => {
	const { formValues, setFormValues, initialState } = useTasacionesFormState();
	const [state, formAction] = useActionState(sendTasacionesForm, initialState);

	useEffect(() => {
		if (state.formData && !state.success) {
			setFormValues(state.formData);
		}
	}, [state.formData, state.success, setFormValues]);

	const message =
		"Gracias por su solicitud. En breve nos comunicaremos para coordinar la evaluación de su propiedad.";

	return (
		<>
			{state.success ? (
				<div className="flex flex-col gap-6">
					<SuccessMessage message={message} />
					<div className="flex justify-center">
						<Button asChild variant="outline">
							<Link href="/">Volver al inicio</Link>
						</Button>
					</div>
				</div>
			) : (
				<form action={formAction}>
					<div className="flex flex-col gap-6">
						<Input
							type="text"
							placeholder="Nombre y Apellido"
							className="bg-white text-sm md:text-base"
							name="name-surname"
							value={formValues.nameSurname}
							onChange={(e) => setFormValues((prev) => ({ ...prev, nameSurname: e.target.value }))}
							required
						/>
						{state.errors?.nameSurname && (
							<p className="text-sm text-red-500 pt-1">{state.errors.nameSurname}</p>
						)}
						<RadioGroup
							value={formValues.operation}
							onValueChange={(value) => setFormValues((prev) => ({ ...prev, operation: value }))}
							className="flex gap-6 sm:gap-16 justify-between sm:justify-center"
							name="operation"
							required
						>
							<div className="flex items-center gap-2">
								<RadioGroupItem
									value="alquilar"
									id="alquilar"
									className="bg-white cursor-pointer"
								/>
								<Label
									htmlFor="alquilar"
									className="font-normal cursor-pointer text-sm md:text-base"
								>
									Quiero <span className="text-secondary font-bold">alquilar</span> mi propiedad
								</Label>
							</div>
							<div className="flex items-center gap-2">
								<RadioGroupItem value="comprar" id="comprar" className="bg-white cursor-pointer" />
								<Label
									htmlFor="comprar"
									className="font-normal cursor-pointer text-sm md:text-base"
								>
									Quiero <span className="text-secondary font-bold">comprar</span> mi propiedad
								</Label>
							</div>
						</RadioGroup>
						<div className="flex flex-col gap-4">
							<Input
								type="text"
								placeholder="Dirección"
								className="bg-white text-sm md:text-base"
								name="address"
								value={formValues.address}
								onChange={(e) => setFormValues((prev) => ({ ...prev, address: e.target.value }))}
								required
							/>
							{state.errors?.address && (
								<p className="text-sm text-red-500 pt-1">{state.errors.address}</p>
							)}
							<Input
								type="email"
								placeholder="Email"
								className="bg-white text-sm md:text-base"
								name="email"
								value={formValues.email}
								onChange={(e) => setFormValues((prev) => ({ ...prev, email: e.target.value }))}
								required
							/>
							{state.errors?.email && (
								<p className="text-sm text-red-500 pt-1">{state.errors.email}</p>
							)}
							<PhoneInput
								name="phone"
								className="bg-white text-sm md:text-base"
								value={formValues.phone}
								onChange={(value) => setFormValues((prev) => ({ ...prev, phone: value }))}
								required
							/>
							{state.errors?.phone && (
								<p className="text-sm text-red-500 pt-1">{state.errors.phone}</p>
							)}
							<Textarea
								placeholder="Mensaje"
								className="bg-white text-sm md:text-base"
								name="message"
								value={formValues.message}
								onChange={(e) => setFormValues((prev) => ({ ...prev, message: e.target.value }))}
								required
							/>
							{state.errors?.message && (
								<p className="text-sm text-red-500 pt-1">{state.errors.message}</p>
							)}
						</div>
						<div className="flex justify-between">
							<div className="flex items-center gap-2">
								<Checkbox
									className="bg-white"
									id="prefiero-que-me-llamen"
									name="prefiero-que-me-llamen"
									checked={formValues.prefieroQueMeLlamen}
									onCheckedChange={(checked) =>
										setFormValues((prev) => ({ ...prev, prefieroQueMeLlamen: !!checked }))
									}
								/>
								<Label
									htmlFor="prefiero-que-me-llamen"
									className="font-normal cursor-pointer text-sm md:text-base"
								>
									Prefiero que me llamen
								</Label>
							</div>
							<Button type="submit" className="text-sm md:text-base py-5 px-7">
								Enviar
							</Button>
						</div>
					</div>
				</form>
			)}
		</>
	);
};
