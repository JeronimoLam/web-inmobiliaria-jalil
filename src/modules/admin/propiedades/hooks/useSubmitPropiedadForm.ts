import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createPropiedad } from "@/modules/admin/propiedades/services/create-propiedad.service";
import { uploadMultipleImages } from "@/modules/admin/propiedades/services/upload-image.service";
import type { CreatePropiedad as CreatePropiedadType } from "@/modules/admin/propiedades/types/create-propiedad.types";
import type { ImageFile } from "@/modules/admin/propiedades/types/images.types";
import { updatePropiedad } from "@/modules/admin/propiedades/services/update-propiedad.service";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { getChangedFields } from "@/modules/admin/propiedades/utils/getChangedFields";
import { UpdatePropiedad } from "@/modules/admin/propiedades/types/update-propiedad.types";
import { deleteImage } from "@/modules/admin/propiedades/services/delete-image.service";
import { updateMainImage } from "@/modules/admin/propiedades/services/update-image.service";
import { transformDataUndefinedToNull } from "@/modules/admin/propiedades/utils/transformDataUndefinedToNull";

interface UseSubmitPropiedadFormProps {
	context: "create" | "edit";
	propiedad?: Propiedad;
	images: ImageFile[];
}

export const useSubmitPropiedadForm = ({
	context,
	propiedad,
	images,
}: UseSubmitPropiedadFormProps) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [uploadingImages, setUploadingImages] = useState(false);

	const onSubmit = async (formData: CreatePropiedadType) => {
		const isValid = formDataValidator(formData, images);
		if (!isValid) return;

		setLoading(true);

		const propiedadFormData = transformDataUndefinedToNull(formData) as CreatePropiedadType;

		try {
			if (context === "create") {
				const dataWithCode = {
					...propiedadFormData,
					propiedad: {
						...propiedadFormData.propiedad,
						codigo: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
					},
					imagenes: [],
				};

				const createdPropiedad = await createPropiedad(dataWithCode);

				if (images.length > 0) {
					setUploadingImages(true);

					const uploadResult = await uploadMultipleImages(images, createdPropiedad.propiedad_id);

					if (!uploadResult.success) {
						toast.error("Error subiendo imágenes. La propiedad fue creada pero sin imágenes.");
						router.push("/admin/propiedades");
						return;
					}

					setUploadingImages(false);
				}

				toast.success("Propiedad creada exitosamente");
				router.push("/admin/propiedades");
			}

			if (context === "edit") {
				if (!propiedad) {
					throw new Error("Propiedad is required to edit");
				}

				const changedFields = getChangedFields(propiedad, propiedadFormData);

				if (Object.keys(changedFields).length === 0) {
					toast.info("No se detectaron cambios en la propiedad");
					return;
				}

				const updateData: UpdatePropiedad = {
					id: propiedad.id,
					...changedFields,
				};

				await updatePropiedad(updateData);

				if (changedFields.imagenes) {
					setUploadingImages(true);

					const oldUrls = propiedad.imagenes.map((img) => img.url);
					const newImages = images.filter((img) => !oldUrls.includes(img.url));

					if (newImages.length > 0) {
						const uploadResult = await uploadMultipleImages(newImages, propiedad.id);

						if (!uploadResult.success) {
							toast.error(
								"Error subiendo imágenes. La propiedad fue actualizada pero sin las nuevas imágenes.",
							);
							router.push("/admin/propiedades");
							return;
						}
					}

					const currentUrls = images.map((img) => img.url);
					const deletedImages = propiedad.imagenes.filter((img) => !currentUrls.includes(img.url));

					if (deletedImages.length > 0) {
						try {
							await Promise.all(
								deletedImages.map((img) => deleteImage(propiedad.id, img.id, img.url)),
							);
						} catch (error: unknown) {
							if (error instanceof Error) {
								throw new Error(error.message || "Error al eliminar imágenes");
							}
							throw new Error("Error al eliminar imágenes");
						}
					}

					if (newImages.length === 0 && deletedImages.length === 0) {
						const mainImage = images.find((img) => img.principal)?.id;
						await updateMainImage(Number(mainImage));
					}

					const deletedHasPrincipal = deletedImages.some((img) => img.principal);
					const newHasPrincipal = newImages.some((img) => img.principal);

					if (deletedHasPrincipal && !newHasPrincipal) {
						const mainImage = images.find((img) => img.principal)?.id;
						if (mainImage) {
							await updateMainImage(Number(mainImage));
						}
					}

					setUploadingImages(false);
				}

				toast.success("Propiedad actualizada exitosamente");
				router.push("/admin/propiedades");
			}
		} catch (error: unknown) {
			console.error("Error creando propiedad:", error);

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

	return {
		loading,
		uploadingImages,
		onSubmit,
	};
};

export const formDataValidator = (formData: CreatePropiedadType, images: ImageFile[]): boolean => {
	if (!formData.propiedad.calle || formData.propiedad.calle.trim() === "") {
		toast.error("La calle es obligatoria");
		return false;
	}

	if (formData.propiedad.numero === undefined || formData.propiedad.numero === null) {
		toast.error("El número es obligatorio");
		return false;
	}

	if (
		formData.propiedad.tipo_propiedad === undefined ||
		formData.propiedad.tipo_propiedad === null
	) {
		toast.error("El tipo de propiedad es obligatorio");
		return false;
	}

	if (!formData.localidad_name || formData.localidad_name.trim() === "") {
		toast.error("La localidad es obligatoria");
		return false;
	}

	if (
		formData.propiedad.descripcion === undefined ||
		formData.propiedad.descripcion.trim() === ""
	) {
		toast.error("La descripción es obligatoria");
		return false;
	}

	if (formData.precios.length === 0) {
		toast.error("Debe agregar al menos un precio (alquiler o venta)");
		return false;
	}

	const preciosInvalidos = formData.precios.filter((precio) => precio.importe === undefined);

	if (preciosInvalidos.length > 0) {
		toast.error(
			"Todos los precios deben tener un importe válido o estar marcados como 'Consultar precio'",
		);
		return false;
	}

	if (
		!formData.propiedad.map_location.coordinates ||
		formData.propiedad.map_location.coordinates[0] === 0 ||
		formData.propiedad.map_location.coordinates[1] === 0
	) {
		toast.error("La ubicación es obligatoria");
		return false;
	}

	if (images.length > 0) {
		const hasPrincipal = images.some((img) => img.principal);
		if (!hasPrincipal) {
			toast.error("Debe seleccionar una imagen principal");
			return false;
		}
	}

	if (formData.propiedad.has_expensas) {
		if (
			formData.propiedad.expensas_value === undefined ||
			formData.propiedad.expensas_value === null
		) {
			toast.error("El importe de las expensas es obligatorio");
			return false;
		}
	}

	if (formData.propiedad.has_expensas) {
		if (
			formData.propiedad.expensas_divisa === undefined ||
			formData.propiedad.expensas_divisa === null
		) {
			toast.error("La divisa de las expensas es obligatoria");
			return false;
		}
	}

	return true;
};
