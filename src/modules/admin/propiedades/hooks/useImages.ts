import { useEffect, useState } from "react";
import { ImageFile } from "../types/images.types";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";

export const useImages = ({ propiedad }: { propiedad?: Propiedad } = {}) => {
	const [images, setImages] = useState<ImageFile[]>([]);

	const handleImagesChange = (newImages: ImageFile[]) => {
		setImages(newImages);
	};

	useEffect(() => {
		if (propiedad && propiedad.imagenes.length > 0) {
			setImages(
				propiedad.imagenes.map((img) => ({
					id: img.id.toString(),
					file: new File([], img.url),
					url: img.url,
					principal: img.principal,
				})),
			);
		}
	}, [propiedad]);

	return {
		images,
		handleImagesChange,
	};
};
