import { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createPropiedad } from "../services/create-propiedad.service";
import { uploadMultipleImages } from "@/modules/admin/propiedades/services/upload-images.service";
import type { CreatePropiedad as CreatePropiedadType } from "../types/create-propiedad.types";
import type { ImageFile } from "../types/images.types";

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

interface UseSubmitCreatePropiedadFormProps {
	images: ImageFile[];
}

export const useSubmitCreatePropiedadForm = ({ images }: UseSubmitCreatePropiedadFormProps) => {
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

			const dataWithCode = {
				...transformedData,
				propiedad: {
					...transformedData.propiedad,
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
