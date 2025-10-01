import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocalidadSearchInput } from "@/modules/admin/propiedades/components/LocalidadSearchInput";
import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { usePrecios } from "../../hooks/usePrecios";
import { CreatePropiedad } from "../../types/create-propiedad.types";
import { TipoPropiedad } from "@/modules/filters/types/filters.type";
import { Localidad } from "@/modules/filters/types/filters.type";
import { LocationPicker } from "../LocationPicker";

interface TabPropiedadProps {
	tiposPropiedad: TipoPropiedad[];
	localidades: Localidad[];
}

export const TabPropiedad = ({ tiposPropiedad, localidades }: TabPropiedadProps) => {
	const {
		register,
		control,
		watch,
		setValue,
		formState: { errors, isSubmitted },
	} = useFormContext<CreatePropiedad>();

	const [showPreciosError, setShowPreciosError] = useState(false);

	const {
		fields: precioFields,
		remove: removePrecio,
		append: appendPrecio,
	} = useFieldArray({
		control,
		name: "precios",
	});

	const precios = watch("precios");

	const { handleAgregarPrecioAlquiler, handleAgregarPrecioVenta, canAddAlquiler, canAddVenta } =
		usePrecios(precios, appendPrecio);

	useEffect(() => {
		if (isSubmitted && precios.length === 0) {
			setShowPreciosError(true);
		} else if (precios.length > 0) {
			setShowPreciosError(false);
		}
	}, [isSubmitted, precios.length]);

	const handleLocationChange = (coordinates: { lat: number; lng: number }) => {
		setValue("propiedad.map_location.coordinates", [coordinates.lat, coordinates.lng]);
	};

	const currentCoordinates = watch("propiedad.map_location.coordinates");
	const currentCoordinatesObject = { lat: currentCoordinates[0], lng: currentCoordinates[1] };

	return (
		<div className="space-y-6">
			<Card className="py-6">
				<CardHeader>
					<CardTitle>Información Básica</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="calle">
								Calle <span className="text-red-500">*</span>
							</Label>
							<Input
								id="calle"
								{...register("propiedad.calle", { required: "La calle es obligatoria" })}
								placeholder="Ej: Calle 7"
							/>
							{errors.propiedad?.calle && (
								<p className="text-sm text-red-500">{errors.propiedad.calle.message}</p>
							)}
						</div>
						<div>
							<Label htmlFor="numero">
								Número <span className="text-red-500">*</span>
							</Label>
							<Input
								id="numero"
								type="number"
								{...register("propiedad.numero", {
									required: "El número es obligatorio",
									validate: (value) => {
										if (value === undefined || value === null) {
											return "El número es obligatorio";
										}
										return true;
									},
									setValueAs: (value) => (value === "" ? undefined : Number(value)),
								})}
								placeholder="Ej: 1234"
							/>
							{errors.propiedad?.numero && (
								<p className="text-sm text-red-500">{errors.propiedad.numero.message}</p>
							)}
						</div>
					</div>

					<div>
						<Label htmlFor="entre_calles">Entre calles</Label>
						<Input
							id="entre_calles"
							{...register("propiedad.entre_calles")}
							placeholder="Ej: 54 y 55"
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="tipo_propiedad">
								Tipo de Propiedad <span className="text-red-500">*</span>
							</Label>
							<select
								id="tipo_propiedad"
								{...register("propiedad.tipo_propiedad", {
									required: "El tipo de propiedad es obligatorio",
									setValueAs: (value) => (value === "" ? undefined : Number(value)),
								})}
								className="w-full p-2 border border-input rounded-md text-sm"
							>
								<option value="">Seleccionar tipo</option>
								{tiposPropiedad.map((tipo) => (
									<option key={tipo.id} value={tipo.id}>
										{tipo.tipo}
									</option>
								))}
							</select>
							{errors.propiedad?.tipo_propiedad && (
								<p className="text-sm text-red-500">{errors.propiedad.tipo_propiedad.message}</p>
							)}
						</div>
						<div className="flex items-center">
							<Controller
								name="localidad_name"
								control={control}
								rules={{ required: "La localidad es obligatoria" }}
								render={({ field }) => (
									<LocalidadSearchInput
										localidades={localidades}
										value={field.value}
										onChange={field.onChange}
										label="Localidad"
										placeholder="Buscar o escribir localidad..."
										error={errors.localidad_name?.message}
									/>
								)}
							/>
						</div>
					</div>

					<div>
						<Label htmlFor="descripcion">
							Descripción <span className="text-red-500">*</span>
						</Label>
						<Textarea
							id="descripcion"
							{...register("propiedad.descripcion", {
								required: "La descripción es obligatoria",
							})}
							placeholder="Descripción de la propiedad"
							rows={4}
						/>
						{errors.propiedad?.descripcion && (
							<p className="text-sm text-red-500">{errors.propiedad.descripcion.message}</p>
						)}
					</div>

					<div className="flex items-center space-x-2">
						<Controller
							name="propiedad.destacada"
							control={control}
							render={({ field }) => (
								<Checkbox id="destacada" checked={field.value} onCheckedChange={field.onChange} />
							)}
						/>
						<Label htmlFor="destacada">Propiedad destacada</Label>
					</div>
				</CardContent>
			</Card>

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
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() => removePrecio(index)}
									>
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

			<Card className="py-6">
				<CardHeader>
					<CardTitle>
						Ubicación <span className="text-red-500">*</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Controller
						name="propiedad.map_location.coordinates"
						control={control}
						rules={{
							required: "Debe seleccionar una ubicación en el mapa",
							validate: (value) => {
								if (!value || (value[0] === 0 && value[1] === 0)) {
									return "Debe seleccionar una ubicación en el mapa";
								}
								return true;
							},
						}}
						render={() => (
							<>
								<LocationPicker
									handleCoordinates={handleLocationChange}
									currentCoordinates={currentCoordinatesObject}
								/>
								{errors.propiedad?.map_location?.coordinates && (
									<p className="text-sm text-red-500 mt-2">
										{errors.propiedad.map_location.coordinates.message}
									</p>
								)}
							</>
						)}
					/>
				</CardContent>
			</Card>
		</div>
	);
};
