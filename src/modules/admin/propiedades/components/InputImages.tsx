"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface ImageFile {
	id: string;
	file: File;
	url: string;
	principal: boolean;
}

interface InputImagesProps {
	images: ImageFile[];
	onImagesChange: (images: ImageFile[]) => void;
	errors?: string;
}

export const InputImages = ({ images, onImagesChange, errors }: InputImagesProps) => {
	const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const imageFiles = acceptedFiles.filter((file) => file.type.startsWith("image/"));

			if (imageFiles.length !== acceptedFiles.length) {
				toast.error("Solo se permiten archivos de imagen");
			}

			if (imageFiles.length === 0) return;

			const newImages: ImageFile[] = imageFiles.map((file) => {
				const id = Math.random().toString(36).substr(2, 9);
				const url = URL.createObjectURL(file);

				setPreviewUrls((prev) => ({ ...prev, [id]: url }));

				return {
					id,
					file,
					url: "", // Se llenará cuando se suba al servidor
					principal: images.length === 0,
				};
			});

			if (images.length === 0 && newImages.length > 0) {
				newImages[0].principal = true;
			}

			onImagesChange([...images, ...newImages]);
		},
		[images, onImagesChange],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
		},
		multiple: true,
	});

	const removeImage = (imageId: string) => {
		const updatedImages = images.filter((img) => img.id !== imageId);

		const wasPrincipal = images.find((img) => img.id === imageId)?.principal;
		if (wasPrincipal && updatedImages.length > 0) {
			updatedImages[0].principal = true;
		}

		setPreviewUrls((prev) => {
			const newUrls = { ...prev };
			delete newUrls[imageId];
			return newUrls;
		});

		onImagesChange(updatedImages);
	};

	const setPrincipalImage = (imageId: string) => {
		const updatedImages = images.map((img) => ({
			...img,
			principal: img.id === imageId,
		}));

		onImagesChange(updatedImages);
	};

	return (
		<Card className="py-6">
			<CardHeader className="mb-3">
				<CardTitle>Imágenes</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
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

				{errors && <p className="text-sm text-red-500">{errors}</p>}

				{images.length > 0 && (
					<div className="space-y-4">
						<h4 className="font-medium">Imágenes cargadas ({images.length})</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{images.map((image, index) => (
								<div key={image.id} className="relative border rounded-lg p-4 space-y-3">
									<div className="relative aspect-video bg-gray-100 rounded-md overflow-hidden">
										{previewUrls[image.id] ? (
											<Image
												src={previewUrls[image.id]}
												alt={`Imagen ${index + 1}`}
												fill
												sizes="(max-width: 768px) 100vw, 50vw"
												className="w-full h-full object-cover"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center">
												<ImageIcon className="h-8 w-8 text-gray-400" />
											</div>
										)}

										{image.principal && (
											<div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
												Principal
											</div>
										)}
									</div>

									<div className="space-y-2">
										<p className="text-sm font-medium truncate">{image.file.name}</p>
										<p className="text-xs text-gray-500">
											{(image.file.size / 1024 / 1024).toFixed(2)} MB
										</p>
									</div>

									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-2">
											<Checkbox
												id={`principal-${image.id}`}
												checked={image.principal}
												onCheckedChange={() => setPrincipalImage(image.id)}
											/>
											<Label htmlFor={`principal-${image.id}`} className="text-sm">
												Principal
											</Label>
										</div>

										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={() => removeImage(image.id)}
											className="text-red-500 hover:text-red-700"
										>
											<X className="h-4 w-4" />
										</Button>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{images.length > 0 && (
					<div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
						<p>• Las imágenes son opcionales</p>
						<p>• Si cargas imágenes, una debe ser marcada como principal</p>
						<p>• Puedes cambiar la imagen principal en cualquier momento</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
