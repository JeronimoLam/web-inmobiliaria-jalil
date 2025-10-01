import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocalidadSearchInput } from "@/modules/admin/propiedades/components/LocalidadSearchInput";
import { CreatePropiedad } from "@/modules/admin/propiedades/types/create-propiedad.types";
import { Localidad, TipoPropiedad } from "@/modules/filters/types/filters.type";

interface InfoBasicFormProps {
	tiposPropiedad: TipoPropiedad[];
	localidades: Localidad[];
}

export const InfoBasicForm = ({ tiposPropiedad, localidades }: InfoBasicFormProps) => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<CreatePropiedad>();

	return (
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
	);
};
