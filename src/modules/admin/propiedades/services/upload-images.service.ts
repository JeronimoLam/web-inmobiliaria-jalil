import { createStorageClient } from "../../utils/supabase/client";

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

const supabase = createStorageClient();

export const uploadImageToSupabase = async (
	file: File,
	propertyId: string,
	index: number,
	isPrincipal: boolean = false,
): Promise<UploadResult> => {
	try {
		const fileExtension = file.name.split(".").pop() || "jpg";
		const fileName = isPrincipal ? "principal" : `${index}`;
		const uniqueFileName = `${fileName}.${fileExtension}`;
		const filePath = `${propertyId}/${uniqueFileName}`;

		const { error } = await supabase.storage
			.from(BUCKET)
			.upload(filePath, file, { cacheControl: "3600", upsert: true });

		if (error) return { success: false, error: error.message };

		const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
		return { success: true, url: urlData.publicUrl };
	} catch (err) {
		return { success: false, error: err instanceof Error ? err.message : "Error desconocido" };
	}
};

export const uploadMultipleImages = async (
	images: ImageFile[],
	propertyId: string,
): Promise<{ success: boolean; images?: ImageFile[]; errors?: string[] }> => {
	if (images.length === 0) return { success: true, images: [] };

	const uploadPromises = images.map(async (image, index) => {
		const result = await uploadImageToSupabase(image.file, propertyId, index, image.principal);
		if (result.success && result.url) return { ...image, url: result.url };
		throw new Error(result.error || "Error subiendo imagen");
	});

	try {
		const uploadedImages = await Promise.all(uploadPromises);
		return { success: true, images: uploadedImages };
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
