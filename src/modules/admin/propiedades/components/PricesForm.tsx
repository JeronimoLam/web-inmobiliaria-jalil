import { useState, useEffect } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { CreatePropiedad } from "@/modules/admin/propiedades/types/create-propiedad.types";
import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { usePrecios } from "@/modules/admin/propiedades/hooks/usePrecios";

export const PricesForm = () => {
	const [showPreciosError, setShowPreciosError] = useState(false);

	const {
		register,
		control,
		watch,
		formState: { errors, isSubmitted },
	} = useFormContext<CreatePropiedad>();

	const {
		fields: precioFields,
		remove: removePrecio,
		append: appendPrecio,
	} = useFieldArray({
		control,
		name: "precios",
	});

	const precios = watch("precios") || [];

	const { handleAgregarPrecioAlquiler, handleAgregarPrecioVenta, canAddAlquiler, canAddVenta } =
		usePrecios(precios, appendPrecio);

	useEffect(() => {
		if (isSubmitted && precios.length === 0) {
			setShowPreciosError(true);
		} else if (precios.length > 0) {
			setShowPreciosError(false);
		}
	}, [isSubmitted, precios.length]);

	return (
		<Card className="py-6">
			<CardHeader>
				<CardTitle>
					Precios <span className="text-red-500">*</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{precioFields.length === 0 && (
					<div className={`py-4 ${showPreciosError ? "text-red-500" : "text-muted-foreground"}`}>
						<p>
							{showPreciosError
								? "Debe agregar al menos un precio (alquiler o venta)"
								: "No hay precios agregados"}
						</p>
					</div>
				)}

				{precioFields.map((field, index) => {
					const operacion = watch(`precios.${index}.estado_publicacion_id`);
					const importe = watch(`precios.${index}.importe`);
					const esAlquiler = operacion === OperacionesEnum.ALQUILER;
					const esVenta = operacion === OperacionesEnum.VENTA;
					const esConsultaPrecio = importe === 0;

					return (
						<div key={field.id} className="border rounded-lg p-4 space-y-4">
							<div className="flex justify-between items-center">
								<h4 className="font-medium">
									{esAlquiler ? "Precio de Alquiler" : "Precio de Venta"}
								</h4>
								<Button type="button" variant="ghost" size="sm" onClick={() => removePrecio(index)}>
									Eliminar
								</Button>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor={`divisa-${index}`}>
										Divisa <span className="text-red-500">*</span>
									</Label>
									<select
										id={`divisa-${index}`}
										{...register(`precios.${index}.divisa`, {
											required: "La divisa es obligatoria",
										})}
										className="w-full p-2 border border-input rounded-md bg-background"
										disabled={esVenta || importe === 0}
									>
										{esVenta ? (
											<option value="USD">USD</option>
										) : (
											<>
												<option value="ARS">ARS</option>
												<option value="USD">USD</option>
											</>
										)}
									</select>
									{errors.precios?.[index]?.divisa && (
										<p className="text-sm text-destructive">
											{errors.precios[index]?.divisa?.message}
										</p>
									)}
								</div>

								<div>
									<Label htmlFor={`importe-${index}`}>
										Importe <span className="text-red-500">*</span>
									</Label>
									<Input
										id={`importe-${index}`}
										type="number"
										{...register(`precios.${index}.importe`, {
											required: !esConsultaPrecio ? "El importe es obligatorio" : false,
											setValueAs: (value) => (value === "" ? undefined : Number(value)),
										})}
										placeholder={esAlquiler ? "Ej: 150000" : "Ej: 50000"}
										disabled={esConsultaPrecio}
									/>
									{errors.precios?.[index]?.importe && (
										<p className="text-sm text-destructive">
											{errors.precios[index]?.importe?.message}
										</p>
									)}
								</div>
							</div>

							<div className="flex items-center space-x-2">
								<Controller
									name={`precios.${index}.importe`}
									control={control}
									render={({ field }) => (
										<Checkbox
											id={`consulta-${index}`}
											checked={esConsultaPrecio}
											onCheckedChange={(checked) => {
												field.onChange(checked ? 0 : undefined);
											}}
										/>
									)}
								/>
								<Label htmlFor={`consulta-${index}`}>Consultar precio</Label>
							</div>
						</div>
					);
				})}

				<div className="flex sm:flex-row flex-col gap-2">
					<Button
						type="button"
						variant="outline"
						onClick={handleAgregarPrecioAlquiler}
						disabled={!canAddAlquiler}
					>
						Agregar Precio Alquiler
					</Button>
					<Button
						type="button"
						variant="outline"
						onClick={handleAgregarPrecioVenta}
						disabled={!canAddVenta}
					>
						Agregar Precio Venta
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
