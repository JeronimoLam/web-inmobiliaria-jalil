import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { createClient } from "../../utils/supabase/client";
import { deleteImageFromSupabase } from "./delete-image.service";
import { ImageFile, SaveImage } from "@/modules/admin/propiedades/types/images.types";
import { IMAGE_BUCKET } from "../constants/image-bucket";
import { updateMainImage } from "./update-image.service";

const supabase = createClient();

export const saveImageToDatabase = async (image: SaveImage) => {
	const supabase = createClient();

	const { data, error } = await supabase.functions.invoke("save-image", {
		body: {
			id_propiedad: image.id_propiedad,
			url: image.url,
			principal: image.principal,
		},
	});

	if (error || !data) throw new Error(error?.message || "Error al guardar la imagen");

	if (data.data[0].principal) {
		await updateMainImage(Number(data.data[0].id));
	}
};

interface UploadImageToSupabaseResult {
	success: boolean;
	url?: string;
	error?: string;
}

export const uploadImageToSupabase = async (
	file: File,
	propertyId: number,
	index: number,
): Promise<UploadImageToSupabaseResult> => {
	try {
		const fileExtension = file.name.split(".").pop()?.toLowerCase() || "jpg";
		const sequentialNumber = String(index + 1).padStart(3, "0");
		const fileName = `img_${sequentialNumber}.${fileExtension}`;
		const filePath = `${propertyId}/${fileName}`;

		const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
		const uploadUrl = `${supabaseUrl}/storage/v1/object/${IMAGE_BUCKET}/${filePath}`;

		const {
			data: { session },
		} = await supabase.auth.getSession();
		const jwt = session?.access_token;

		if (!jwt) {
			return { success: false, error: "El usuario no está autenticado" };
		}

		const response = await fetch(uploadUrl, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": file.type,
			},
			body: file,
		});

		if (!response.ok) {
			const errorText = await response.text();
			return { success: false, error: `Error ${response.status}: ${errorText}` };
		}

		const publicUrl = `${supabaseUrl}/storage/v1/object/public/${IMAGE_BUCKET}/${filePath}`;
		return { success: true, url: publicUrl };
	} catch (err) {
		return { success: false, error: err instanceof Error ? err.message : "Error desconocido" };
	}
};

export const uploadMultipleImages = async (
	images: ImageFile[],
	propertyId: number,
	propiedad?: Propiedad,
): Promise<{ success: boolean; images?: ImageFile[]; errors?: string[] }> => {
	if (images.length === 0) return { success: true, images: [] };

	const uploadPromises = images.map(async (image, index) => {
		const result = await uploadImageToSupabase(
			image.file,
			propertyId,
			index + (propiedad?.imagenes.length || 0),
		);
		if (result.success && result.url) {
			return { ...image, url: result.url };
		}
		throw new Error(result.error || "Error subiendo imagen");
	});

	try {
		const uploadedImages = await Promise.all(uploadPromises);

		if (uploadedImages.length > 0) {
			try {
				await Promise.all(
					uploadedImages.map((image) =>
						saveImageToDatabase({
							id_propiedad: propertyId,
							url: image.url,
							principal: image.principal,
						}),
					),
				);

				return { success: true, images: uploadedImages };
			} catch (error) {
				await Promise.all(
					uploadedImages.map((image) => deleteImageFromSupabase(propertyId, image.url)),
				);
				throw new Error(error instanceof Error ? error.message : "Error al guardar las imágenes");
			}
		}
		return { success: false, images: [], errors: ["No se subieron imágenes"] };
	} catch (err) {
		return { success: false, errors: [err instanceof Error ? err.message : "Error desconocido"] };
	}
};
