"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LocalidadSearchInput } from "@/modules/admin/propiedades/components/LocalidadSearchInput";
import { InputImages } from "@/modules/admin/propiedades/components/InputImages";
import { createPropiedad } from "../services/create-propiedad.service";
import { uploadMultipleImages } from "@/modules/admin/propiedades/services/upload-images.service";
import { FiltersApiService } from "@/modules/filters/services/filtersApi.service";
import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";
import type { Localidad } from "@/modules/filters/types/filters.type";
import type { CreatePropiedad as CreatePropiedadType } from "../types/create-propiedad.type";
import type { TipoPropiedad } from "@/modules/filters/types/filters.type";
import { CREATE_PROPIEDAD_DEFAULT_VALUES } from "../constants/CreatePropiedadDefaultValues";

interface ImageFile {
	id: string;
	file: File;
	url: string;
	principal: boolean;
}

export const NuevaPropiedadForm = () => {
	const router = useRouter();
	const [tiposPropiedad, setTiposPropiedad] = useState<TipoPropiedad[]>([]);
	const [localidades, setLocalidades] = useState<Localidad[]>([]);
	const [loading, setLoading] = useState(false);
	const [uploadingImages, setUploadingImages] = useState(false);
	const [images, setImages] = useState<ImageFile[]>([]);

	const {
		register,
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<CreatePropiedadType>({
		defaultValues: CREATE_PROPIEDAD_DEFAULT_VALUES,
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

	const onSubmit = async (data: CreatePropiedadType) => {
		// Validar que al menos haya un precio
		if (data.precios.length === 0) {
			toast.error("Debe agregar al menos un precio");
			return;
		}

		// Validar que si hay imágenes, al menos una sea principal
		if (images.length > 0) {
			const hasPrincipal = images.some((img) => img.principal);
			if (!hasPrincipal) {
				toast.error("Debe seleccionar una imagen principal");
				return;
			}
		}

		setLoading(true);

		try {
			// Generar código único justo antes de enviar
			const dataWithCode = {
				...data,
				propiedad: {
					...data.propiedad,
					codigo: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
				},
				imagenes: [], // Inicialmente sin imágenes
			};

			// Crear la propiedad primero (sin imágenes)
			const createdPropiedad = await createPropiedad(dataWithCode);

			// Si hay imágenes, subirlas después de crear la propiedad
			if (images.length > 0) {
				setUploadingImages(true);

				// Usar el ID de la propiedad creada para organizar las imágenes
				const uploadResult = await uploadMultipleImages(
					images,
					createdPropiedad.propiedad_id.toString(),
				);

				if (!uploadResult.success) {
					toast.error("Error subiendo imágenes. La propiedad fue creada pero sin imágenes.");
					router.push("/admin/propiedades");
					return;
				}

				setUploadingImages(false);
			}

			toast.success("Propiedad creada exitosamente");
			router.push("/admin/propiedades");
		} catch (error) {
			console.error("Error creando propiedad:", error);

			// Manejar diferentes tipos de errores
			if (error instanceof Error) {
				if (error.message.includes("409") || error.message.includes("Conflict")) {
					toast.error("Ya existe una propiedad con este código o datos duplicados");
				} else if (error.message.includes("400") || error.message.includes("Bad Request")) {
					toast.error("Datos inválidos. Verifique la información ingresada");
				} else if (
					error.message.includes("500") ||
					error.message.includes("Internal Server Error")
				) {
					toast.error("Error interno del servidor. Intente nuevamente");
				} else {
					toast.error(`Error: ${error.message}`);
				}
			} else {
				toast.error("Error inesperado al crear la propiedad");
			}
		} finally {
			setLoading(false);
			setUploadingImages(false);
		}
	};

	const handleCancel = () => {
		router.push("/admin/propiedades");
	};

	const handleImagesChange = (newImages: ImageFile[]) => {
		setImages(newImages);
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
									<Controller
										name="propiedad.destacada"
										control={control}
										render={({ field }) => (
											<Checkbox
												id="destacada"
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										)}
									/>
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
												<Controller
													name={`precios.${index}.importe`}
													control={control}
													render={({ field }) => (
														<Checkbox
															id={`consulta-${index}`}
															checked={field.value === 0}
															onCheckedChange={(checked) => {
																field.onChange(checked ? 0 : 100000);
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
											<Controller
												name={`caracteristicas.${key as keyof CreatePropiedadType["caracteristicas"]}`}
												control={control}
												render={({ field }) => (
													<Checkbox
														id={key}
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
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
											<Controller
												name={`ambientes.${key as keyof CreatePropiedadType["ambientes"]}`}
												control={control}
												render={({ field }) => (
													<Checkbox
														id={key}
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
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
											<Controller
												name={`servicios.${key as keyof CreatePropiedadType["servicios"]}`}
												control={control}
												render={({ field }) => (
													<Checkbox
														id={key}
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
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
					</TabsContent>

					{/* Tab 3: Imágenes */}
					<TabsContent value="imagenes" className="space-y-6">
						<InputImages
							images={images}
							onImagesChange={handleImagesChange}
							errors={errors.imagenes?.message}
						/>
					</TabsContent>
				</Tabs>

				{/* Botones de acción */}
				<div className="flex justify-end space-x-4 pt-6">
					<Button type="button" variant="outline" onClick={handleCancel}>
						Cancelar
					</Button>
					<Button type="submit" disabled={loading || uploadingImages}>
						{loading || uploadingImages ? "Procesando..." : "Crear Propiedad"}
					</Button>
				</div>
			</form>
		</div>
	);
};
