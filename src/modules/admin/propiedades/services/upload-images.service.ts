import { createClient } from "../../utils/supabase/client";

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

const getSupabaseApiKey = (): string => {
	return (
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
		""
	);
};

export const uploadImageToSupabase = async (
	file: File,
	propertyId: string,
	index: number,
): Promise<UploadResult> => {
	try {
		const apiKey = getSupabaseApiKey();
		if (!apiKey) {
			return { success: false, error: "No se pudo obtener API key de Supabase" };
		}

		const fileExtension = file.name.split(".").pop()?.toLowerCase() || "jpg";
		const sequentialNumber = String(index + 1).padStart(3, "0");
		const fileName = `img_${sequentialNumber}`;
		const uniqueFileName = `${fileName}.${fileExtension}`;
		const filePath = `${propertyId}/${uniqueFileName}`;

		const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
		const uploadUrl = `${supabaseUrl}/storage/v1/object/${BUCKET}/${filePath}`;

		const response = await fetch(uploadUrl, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
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
): Promise<{ success: boolean; images?: ImageFile[]; errors?: string[] }> => {
	if (images.length === 0) return { success: true, images: [] };

	const uploadPromises = images.map(async (image, index) => {
		const result = await uploadImageToSupabase(image.file, propertyId, index);
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
