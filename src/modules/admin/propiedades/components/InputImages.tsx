"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface ImageFile {
	id: string;
	file: File;
	url: string;
	principal: boolean;
}

interface InputImagesProps {
	images: ImageFile[];
	onImagesChange: (images: ImageFile[]) => void;
	updatePreviewUrls: (urls: Record<string, string>) => void;
}

export const InputImages = ({ images, onImagesChange, updatePreviewUrls }: InputImagesProps) => {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const imageFiles = acceptedFiles.filter((file) => file.type.startsWith("image/"));

			if (imageFiles.length !== acceptedFiles.length) {
				toast.error("Solo se permiten archivos de imagen");
			}

			if (imageFiles.length === 0) return;

			const newImages: ImageFile[] = imageFiles.map((file, index) => {
				const id = Math.random().toString(36).substr(2, 9);
				const url = URL.createObjectURL(file);

				updatePreviewUrls({ [id]: url });

				return {
					id,
					file,
					url: url,
					principal: images.length === 0 && index === 0,
				};
			});

			onImagesChange([...images, ...newImages]);
		},
		[images, onImagesChange, updatePreviewUrls],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
		},
		multiple: true,
	});

	return (
		<div
			{...getRootProps()}
			className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
				isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50"
			}`}
		>
			<input {...getInputProps()} />
			<div className="flex flex-col items-center space-y-2">
				<Upload className="h-8 w-8 text-gray-400" />
				<div>
					<p className="text-sm text-gray-600">
						{isDragActive
							? "Suelta las imágenes aquí..."
							: "Arrastra imágenes aquí o haz clic para seleccionar"}
					</p>
					<p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF, WEBP hasta 10MB</p>
				</div>
			</div>
		</div>
	);
};
