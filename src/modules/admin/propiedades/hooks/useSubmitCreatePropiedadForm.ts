import { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createPropiedad } from "../services/create-propiedad.service";
import { uploadMultipleImages } from "@/modules/admin/propiedades/services/upload-images.service";
import type { CreatePropiedad as CreatePropiedadType } from "../types/create-propiedad.types";
import type { ImageFile } from "../types/images.types";

interface UseNuevaPropiedadFormProps {
	images: ImageFile[];
}

export const useSubmitCreatePropiedadForm = ({ images }: UseNuevaPropiedadFormProps) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [uploadingImages, setUploadingImages] = useState(false);

	const onSubmit = async (data: CreatePropiedadType) => {
		if (data.precios.length === 0) {
			toast.error("Debe agregar al menos un precio");
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
			const dataWithCode = {
				...data,
				propiedad: {
					...data.propiedad,
					codigo: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
				},
				imagenes: [],
			};

			const createdPropiedad = await createPropiedad(dataWithCode);

			if (images.length > 0) {
				setUploadingImages(true);

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
