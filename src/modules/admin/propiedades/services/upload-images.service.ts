import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { createClient } from "../../utils/supabase/client";
import { saveImage } from "./save-image.service";

interface ImageFile {
	id: string;
	file: File;
	url: string;
	principal: boolean;
}

interface UploadResult {
	success: boolean;
	url?: string;
	error?: string;
}

const BUCKET = "jalil_public_images";

const supabase = createClient();

// const getSupabaseApiKey = (): string => {
// 	return (
// 		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
// 		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
// 		""
// 	);
// };

export const uploadImageToSupabase = async (
	file: File,
	propertyId: string,
	index: number,
): Promise<UploadResult> => {
	try {
		const fileExtension = file.name.split(".").pop()?.toLowerCase() || "jpg";
		const sequentialNumber = String(index + 1).padStart(3, "0");
		const fileName = `img_${sequentialNumber}.${fileExtension}`;
		const filePath = `${propertyId}/${fileName}`;

		const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
		const uploadUrl = `${supabaseUrl}/storage/v1/object/${BUCKET}/${filePath}`;

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

		const publicUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${filePath}`;
		return { success: true, url: publicUrl };
	} catch (err) {
		return { success: false, error: err instanceof Error ? err.message : "Error desconocido" };
	}
};

export const uploadMultipleImages = async (
	images: ImageFile[],
	propertyId: string,
	propiedad?: Propiedad,
): Promise<{ success: boolean; images?: ImageFile[]; errors?: string[] }> => {
	if (images.length === 0) return { success: true, images: [] };

	const uploadPromises = images.map(async (image, index) => {
		const result = await uploadImageToSupabase(
			image.file,
			propertyId,
			index + (propiedad?.imagenes.length || 0),
		);
		if (result.success && result.url) return { ...image, url: result.url };
		throw new Error(result.error || "Error subiendo imagen");
	});

	try {
		const uploadedImages = await Promise.all(uploadPromises);

		if (!propiedad) {
			if (uploadedImages.length > 0) {
				try {
					await Promise.all(
						uploadedImages.map((image) =>
							saveImage({
								id_propiedad: parseInt(propertyId),
								url: image.url,
								principal: image.principal,
							}),
						),
					);

					return { success: true, images: uploadedImages };
				} catch (error) {
					await Promise.all(uploadedImages.map((image) => deleteImageFromSupabase(image.url)));
					throw new Error(error instanceof Error ? error.message : "Error al guardar las imágenes");
				}
			}
			return { success: false, images: [], errors: ["No se subieron imágenes"] };
		} else {
			return { success: true, images: uploadedImages };
		}
	} catch (err) {
		return { success: false, errors: [err instanceof Error ? err.message : "Error desconocido"] };
	}
};

export const deleteImageFromSupabase = async (imageUrl: string): Promise<boolean> => {
	try {
		const parts = imageUrl.split(`${BUCKET}/`);
		const filePath = parts[1];
		if (!filePath) return false;
		const { error } = await supabase.storage.from(BUCKET).remove([filePath]);
		return !error;
	} catch {
		return false;
	}
};
