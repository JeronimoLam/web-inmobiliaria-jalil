import { useState } from "react";
import { ImageFile } from "../types/images.types";

export const useImages = () => {
	const [images, setImages] = useState<ImageFile[]>([]);

	const handleImagesChange = (newImages: ImageFile[]) => {
		setImages(newImages);
	};
	return {
		images,
		handleImagesChange,
	};
};
