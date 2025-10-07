import { createClient } from "../../utils/supabase/client";

export const updateMainImage = async (mainImageId: number) => {
	const supabase = createClient();

	const { error: errorMainImage } = await supabase
		.from("imagenes")
		.update({ principal: true })
		.eq("id", mainImageId);

	const { error: errorOtherImages } = await supabase
		.from("imagenes")
		.update({ principal: false })
		.not("id", "eq", mainImageId);

	if (errorOtherImages || errorMainImage)
		throw new Error(
			errorMainImage?.message ||
				errorOtherImages?.message ||
				"Error al actualizar la imagen principal",
		);
};
