"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createPropiedad } from "../services/create-propiedad.service";
import { FiltersApiService } from "@/modules/filters/services/filtersApi.service";
import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";
import type { Localidad } from "@/modules/filters/types/filters.type";
import type { CreatePropiedad as CreatePropiedadType } from "../types/create-propiedad.type";
import type { TipoPropiedad } from "@/modules/filters/types/filters.type";
import { CREATE_PROPIEDAD_DEFAULT_VALUES } from "../constants/CreatePropiedadDefaultValues";

export const NuevaPropiedadForm = () => {
	const router = useRouter();
	const [tiposPropiedad, setTiposPropiedad] = useState<TipoPropiedad[]>([]);
	const [localidades, setLocalidades] = useState<Localidad[]>([]);
	const [loading, setLoading] = useState(false);

	const {
		register,
		control,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<CreatePropiedadType>({
		defaultValues: CREATE_PROPIEDAD_DEFAULT_VALUES,
	});

	const {
		fields: imagenFields,
		append: appendImagen,
		remove: removeImagen,
	} = useFieldArray({
		control,
		name: "imagenes",
	});

	const {
		fields: precioFields,
		append: appendPrecio,
		remove: removePrecio,
	} = useFieldArray({
		control,
		name: "precios",
	});

	const precios = watch("precios");

	useEffect(() => {
		const loadData = async () => {
			try {
				const [tipos, localidades] = await Promise.all([
					FiltersApiService.getTiposPropiedad(),
					FiltersApiService.getLocalidades(),
				]);
				setTiposPropiedad(tipos);
				setLocalidades(localidades);
			} catch (error) {
				console.error("Error cargando datos:", error);
				toast.error("Error al cargar los datos iniciales");
			}
		};

		loadData();
	}, []);

	// Ya no agregamos precio inicial automáticamente

	const onSubmit = async (data: CreatePropiedadType) => {
		// Validar que al menos haya un precio
		if (data.precios.length === 0) {
			toast.error("Debe agregar al menos un precio");
			return;
		}

		setLoading(true);
		try {
			await createPropiedad(data);
			toast.success("Propiedad creada exitosamente");
			router.push("/admin/propiedades");
		} catch (error) {
			console.error("Error creando propiedad:", error);
			toast.error("Error al crear la propiedad");
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		router.push("/admin/propiedades");
	};

	const handleAgregarImagen = () => {
		appendImagen({ url: "", principal: imagenFields.length === 0 });
	};

	const handleAgregarPrecioAlquiler = () => {
		const tieneAlquiler = precios.some((p) => p.estado_publicacion_id === OperacionesEnum.ALQUILER);
		if (tieneAlquiler) return;

		appendPrecio({
			estado_publicacion_id: OperacionesEnum.ALQUILER,
			importe: 100000,
			divisa: "ARS",
		});
	};

	const handleAgregarPrecioVenta = () => {
		const tieneVenta = precios.some((p) => p.estado_publicacion_id === OperacionesEnum.VENTA);
		if (tieneVenta) return;

		appendPrecio({
			estado_publicacion_id: OperacionesEnum.VENTA,
			importe: 100000,
			divisa: "USD",
		});
	};

	const handleImagenPrincipalChange = (index: number) => {
		// Marcar todas las imágenes como no principales
		imagenFields.forEach((_, i) => {
			setValue(`imagenes.${i}.principal`, false);
		});
		// Marcar la seleccionada como principal
		setValue(`imagenes.${index}.principal`, true);
	};

	return (
		<div className="px-4 py-6 sm:p-6">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<Tabs defaultValue="propiedad" className="w-full">
					<TabsList className="grid w-full grid-cols-3 bg-secondary">
						<TabsTrigger value="propiedad">Propiedad</TabsTrigger>
						<TabsTrigger value="detalles">Detalles</TabsTrigger>
						<TabsTrigger value="imagenes">Imágenes</TabsTrigger>
					</TabsList>

					{/* Tab 1: Propiedad */}
					<TabsContent value="propiedad" className="space-y-6">
						<Card className="py-6">
							<CardHeader>
								<CardTitle>Información Básica</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<Label htmlFor="calle">Calle *</Label>
										<Input
											id="calle"
											{...register("propiedad.calle", { required: "La calle es obligatoria" })}
											placeholder="Nombre de la calle"
										/>
										{errors.propiedad?.calle && (
											<p className="text-sm text-red-500">{errors.propiedad.calle.message}</p>
										)}
									</div>
									<div>
										<Label htmlFor="numero">Número</Label>
										<Input
											id="numero"
											type="number"
											{...register("propiedad.numero", { valueAsNumber: true })}
											placeholder="Número"
										/>
									</div>
								</div>

								<div>
									<Label htmlFor="entre_calles">Entre calles</Label>
									<Input
										id="entre_calles"
										{...register("propiedad.entre_calles")}
										placeholder="Entre calle A y calle B"
									/>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<Label htmlFor="tipo_propiedad">Tipo de Propiedad *</Label>
										<select
											id="tipo_propiedad"
											{...register("propiedad.tipo_propiedad", {
												required: "El tipo de propiedad es obligatorio",
												valueAsNumber: true,
											})}
											className="w-full p-2 border border-gray-300 rounded-md"
										>
											<option value="">Seleccionar tipo</option>
											{tiposPropiedad.map((tipo) => (
												<option key={tipo.id} value={tipo.id}>
													{tipo.tipo}
												</option>
											))}
										</select>
										{errors.propiedad?.tipo_propiedad && (
											<p className="text-sm text-red-500">
												{errors.propiedad.tipo_propiedad.message}
											</p>
										)}
									</div>
									<div>
										<Label htmlFor="localidad_name">Localidad *</Label>
										<select
											id="localidad_name"
											{...register("localidad_name", { required: "La localidad es obligatoria" })}
											className="w-full p-2 border border-input rounded-md bg-background"
										>
											<option value="">Seleccionar localidad</option>
											{localidades.map((localidad) => (
												<option key={localidad.id} value={localidad.nombre}>
													{localidad.nombre}
												</option>
											))}
										</select>
										{errors.localidad_name && (
											<p className="text-sm text-destructive">{errors.localidad_name.message}</p>
										)}
									</div>
								</div>

								<div>
									<Label htmlFor="descripcion">Descripción *</Label>
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
									<Checkbox id="destacada" {...register("propiedad.destacada")} />
									<Label htmlFor="destacada">Propiedad destacada</Label>
								</div>
							</CardContent>
						</Card>

						{/* Precios */}
						<Card className="py-6">
							<CardHeader>
								<CardTitle>Precios</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								{precioFields.length === 0 && (
									<div className="py-6 text-muted-foreground">
										<p>No hay precios agregados</p>
									</div>
								)}

								{precioFields.map((field, index) => {
									const operacion = watch(`precios.${index}.estado_publicacion_id`);
									const importe = watch(`precios.${index}.importe`);
									const esAlquiler = operacion === OperacionesEnum.ALQUILER;
									const esVenta = operacion === OperacionesEnum.VENTA;

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
													<Label htmlFor={`divisa-${index}`}>Divisa *</Label>
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
													<Label htmlFor={`importe-${index}`}>Importe *</Label>
													<Input
														id={`importe-${index}`}
														type="number"
														{...register(`precios.${index}.importe`, {
															required: "El importe es obligatorio",
															valueAsNumber: true,
														})}
														placeholder="0"
														disabled={importe === 0}
													/>
													{errors.precios?.[index]?.importe && (
														<p className="text-sm text-destructive">
															{errors.precios[index]?.importe?.message}
														</p>
													)}
												</div>
											</div>

											<div className="flex items-center space-x-2">
												<Checkbox
													id={`consulta-${index}`}
													checked={importe === 0}
													onCheckedChange={(checked) => {
														setValue(`precios.${index}.importe`, checked ? 0 : 100000);
													}}
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
										disabled={precios.some(
											(p) => p.estado_publicacion_id === OperacionesEnum.ALQUILER,
										)}
									>
										Agregar Precio Alquiler
									</Button>
									<Button
										type="button"
										variant="outline"
										onClick={handleAgregarPrecioVenta}
										disabled={precios.some(
											(p) => p.estado_publicacion_id === OperacionesEnum.VENTA,
										)}
									>
										Agregar Precio Venta
									</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Tab 2: Detalles */}
					<TabsContent value="detalles" className="space-y-6">
						{/* Detalles básicos */}
						<Card className="py-6">
							<CardHeader>
								<CardTitle>Detalles Básicos</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div>
										<Label htmlFor="ambientes">Ambientes</Label>
										<Input
											id="ambientes"
											type="number"
											{...register("detalles.ambientes", { valueAsNumber: true })}
											placeholder="0"
										/>
									</div>
									<div>
										<Label htmlFor="dormitorios">Dormitorios</Label>
										<Input
											id="dormitorios"
											type="number"
											{...register("detalles.dormitorios", { valueAsNumber: true })}
											placeholder="0"
										/>
									</div>
									<div>
										<Label htmlFor="banos">Baños</Label>
										<Input
											id="banos"
											type="number"
											{...register("detalles.banos", { valueAsNumber: true })}
											placeholder="0"
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div>
										<Label htmlFor="superficie_lote">Superficie del lote (m²)</Label>
										<Input
											id="superficie_lote"
											type="number"
											step="0.1"
											{...register("detalles.superficie_lote", { valueAsNumber: true })}
											placeholder="0"
										/>
									</div>
									<div>
										<Label htmlFor="superficie_cubierta">Superficie cubierta (m²)</Label>
										<Input
											id="superficie_cubierta"
											type="number"
											step="0.1"
											{...register("detalles.superficie_cubierta", { valueAsNumber: true })}
											placeholder="0"
										/>
									</div>
									<div>
										<Label htmlFor="antiguedad">Antigüedad</Label>
										<Input
											id="antiguedad"
											{...register("detalles.antiguedad")}
											placeholder="Ej: 5 años"
										/>
									</div>
								</div>

								<div>
									<Label htmlFor="garage">Garage</Label>
									<Input
										id="garage"
										{...register("detalles.garage")}
										placeholder="Ej: Cubierto, Descubierto"
									/>
								</div>
							</CardContent>
						</Card>

						{/* Características */}
						<Card className="py-6">
							<CardHeader>
								<CardTitle>Características</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
									{Object.entries({
										agua_caliente_central: "Agua caliente central",
										aire_acondicionado_individual: "Aire acondicionado individual",
										alarma: "Alarma",
										amoblado: "Amoblado",
										calefaccion_individual: "Calefacción individual",
										apto_credito: "Apto crédito",
										apto_mascotas: "Apto mascotas",
										apto_profesional: "Apto profesional",
										calefaccion: "Calefacción",
										calefaccion_central: "Calefacción central",
										luminoso: "Luminoso",
										seguridad: "Seguridad",
										pileta: "Pileta",
										parrilla: "Parrilla",
										quincho: "Quincho",
										hidromasaje: "Hidromasaje",
										gimnasio: "Gimnasio",
										sauna: "Sauna",
										deck: "Deck",
										riego_automatico: "Riego automático",
									}).map(([key, label]) => (
										<div key={key} className="flex items-center space-x-2">
											<Checkbox
												id={key}
												{...register(
													`caracteristicas.${key as keyof CreatePropiedadType["caracteristicas"]}`,
												)}
											/>
											<Label htmlFor={key} className="text-sm">
												{label}
											</Label>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Ambientes */}
						<Card className="py-6">
							<CardHeader>
								<CardTitle>Ambientes</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
									{Object.entries({
										cocina: "Cocina",
										comedor: "Comedor",
										living: "Living",
										hall: "Hall",
										lavadero: "Lavadero",
										toilette: "Toilette",
										balcon: "Balcón",
										terraza: "Terraza",
										jardin: "Jardín",
										patio: "Patio",
										baulera: "Baulera",
										altillo: "Altillo",
										sotano: "Sótano",
										suite: "Suite",
										vestidor: "Vestidor",
										oficina: "Oficina",
										escritorio: "Escritorio",
										biblioteca: "Biblioteca",
										galeria: "Galería",
										dependencia: "Dependencia",
										comedor_diario: "Comedor diario",
										living_comedor: "Living comedor",
									}).map(([key, label]) => (
										<div key={key} className="flex items-center space-x-2">
											<Checkbox
												id={key}
												{...register(`ambientes.${key as keyof CreatePropiedadType["ambientes"]}`)}
											/>
											<Label htmlFor={key} className="text-sm">
												{label}
											</Label>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Servicios */}
						<Card className="py-6">
							<CardHeader>
								<CardTitle>Servicios</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
									{Object.entries({
										agua_corriente: "Agua corriente",
										cloaca: "Cloaca",
										electricidad: "Electricidad",
										gas_natural: "Gas natural",
										internet: "Internet",
										pavimento: "Pavimento",
										telefono: "Teléfono",
										videocable: "Videocable",
									}).map(([key, label]) => (
										<div key={key} className="flex items-center space-x-2">
											<Checkbox
												id={key}
												{...register(`servicios.${key as keyof CreatePropiedadType["servicios"]}`)}
											/>
											<Label htmlFor={key} className="text-sm">
												{label}
											</Label>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Tab 3: Imágenes */}
					<TabsContent value="imagenes" className="space-y-6">
						<Card className="py-6">
							<CardHeader>
								<CardTitle>Imágenes</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								{imagenFields.map((field, index) => (
									<div key={field.id} className="border p-4 rounded-lg space-y-4">
										<div className="flex justify-between items-center">
											<h4 className="font-medium">Imagen {index + 1}</h4>
											<Button
												type="button"
												variant="outline"
												size="sm"
												onClick={() => removeImagen(index)}
											>
												Eliminar
											</Button>
										</div>

										<div>
											<Label htmlFor={`imagen-${index}`}>URL de la imagen *</Label>
											<Input
												id={`imagen-${index}`}
												{...register(`imagenes.${index}.url`, {
													required: "La URL es obligatoria",
												})}
												placeholder="https://ejemplo.com/imagen.jpg"
											/>
											{errors.imagenes?.[index]?.url && (
												<p className="text-sm text-red-500">
													{errors.imagenes[index]?.url?.message}
												</p>
											)}
										</div>

										<div className="flex items-center space-x-2">
											<Checkbox
												id={`principal-${index}`}
												checked={watch(`imagenes.${index}.principal`)}
												onCheckedChange={() => handleImagenPrincipalChange(index)}
											/>
											<Label htmlFor={`principal-${index}`}>Imagen principal</Label>
										</div>
									</div>
								))}

								<Button type="button" variant="outline" onClick={handleAgregarImagen}>
									Agregar imagen
								</Button>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>

				{/* Botones de acción */}
				<div className="flex justify-end space-x-4 pt-6">
					<Button type="button" variant="outline" onClick={handleCancel}>
						Cancelar
					</Button>
					<Button type="submit" disabled={loading}>
						{loading ? "Creando..." : "Crear Propiedad"}
					</Button>
				</div>
			</form>
		</div>
	);
};
