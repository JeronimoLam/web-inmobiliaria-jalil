import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updatePropiedad } from "../services/update-propiedad.service";
import { uploadMultipleImages } from "@/modules/admin/propiedades/services/upload-image.service";
import type { CreatePropiedad as CreatePropiedadType } from "../types/create-propiedad.types";
import type { ImageFile } from "../types/images.types";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { getChangedFields } from "../utils/getChangedFields";
import { UpdatePropiedad } from "../types/update-propiedad.types";
import { deleteImage } from "../services/delete-image.service";
import { getImagenesFromPropiedadId } from "../services/get-imagenes-from-propiedad-id.service";

const transformUndefinedToNull = (obj: unknown): unknown => {
	if (obj === undefined) {
		return null;
	}

	if (Array.isArray(obj)) {
		return obj.map(transformUndefinedToNull);
	}

	if (typeof obj === "object" && obj !== null) {
		const transformed: Record<string, unknown> = {};
		for (const [key, value] of Object.entries(obj)) {
			transformed[key] = transformUndefinedToNull(value);
		}
		return transformed;
	}

	return obj;
};

interface UseSubmitEditPropiedadFormProps {
	images: ImageFile[];
	propiedad: Propiedad;
}

export const useSubmitEditPropiedadForm = ({
	images,
	propiedad,
}: UseSubmitEditPropiedadFormProps) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [uploadingImages, setUploadingImages] = useState(false);

	const onSubmit = async (data: CreatePropiedadType) => {
		if (!data.propiedad.calle || data.propiedad.calle.trim() === "") {
			toast.error("La calle es obligatoria");
			return;
		}

		if (data.propiedad.numero === undefined || data.propiedad.numero === null) {
			toast.error("El número es obligatorio");
			return;
		}

		if (data.propiedad.tipo_propiedad === undefined || data.propiedad.tipo_propiedad === null) {
			toast.error("El tipo de propiedad es obligatorio");
			return;
		}

		if (!data.localidad_name || data.localidad_name.trim() === "") {
			toast.error("La localidad es obligatoria");
			return;
		}

		if (data.propiedad.descripcion === undefined || data.propiedad.descripcion.trim() === "") {
			toast.error("La descripción es obligatoria");
			return;
		}

		if (data.precios.length === 0) {
			toast.error("Debe agregar al menos un precio (alquiler o venta)");
			return;
		}

		const preciosInvalidos = data.precios.filter((precio) => precio.importe === undefined);

		if (preciosInvalidos.length > 0) {
			toast.error(
				"Todos los precios deben tener un importe válido o estar marcados como 'Consultar precio'",
			);
			return;
		}

		if (
			!data.propiedad.map_location.coordinates ||
			data.propiedad.map_location.coordinates[0] === 0 ||
			data.propiedad.map_location.coordinates[1] === 0
		) {
			toast.error("La ubicación es obligatoria");
			return;
		}

		if (images.length > 0) {
			const hasPrincipal = images.some((img) => img.principal);
			if (!hasPrincipal) {
				toast.error("Debe seleccionar una imagen principal");
				return;
			}
		}

		setLoading(true);

		try {
			const transformedData = transformUndefinedToNull(data) as CreatePropiedadType;

			const changedFields = getChangedFields(propiedad, transformedData);

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
					const uploadResult = await uploadMultipleImages(newImages, propiedad.id, propiedad);
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

				// Una vez agregadas o eliminadas las imágenes, actualizamos la propiedad
				// actualizamos la imagen principal
				const newMainImage = newImages.find((img) => img.principal);
				// Recuperamos todas las imágenes actualizadas

				const updatedPropiedadImages = await getImagenesFromPropiedadId(propiedad.id);

				// const imageToUpdate = updatedPropiedadImages.find((img) => img.id === newMainImage?.id);

				if (newMainImage) {
					await updatePropiedad({
						id: propiedad.id,
						imagenes: [newMainImage],
					});
				}

				setUploadingImages(false);
			}

			toast.success("Propiedad actualizada exitosamente");
			router.push("/admin/propiedades");
		} catch (error) {
			console.error("Error actualizando propiedad:", error);

			if (error instanceof Error) {
				if (error.message.includes("409") || error.message.includes("Conflict")) {
					toast.error("Ya existe una propiedad con estos datos duplicados");
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
				toast.error("Error inesperado al actualizar la propiedad");
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
