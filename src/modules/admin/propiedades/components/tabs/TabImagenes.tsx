import { X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { ImageFile } from "@/modules/admin/propiedades/types/images.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { InputImages } from "@/modules/admin/propiedades/components/InputImages";
import { CreatePropiedad } from "@/modules/admin/propiedades/types/create-propiedad.types";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";

interface TabImagenesProps {
	images: ImageFile[];
	onImagesChange: (images: ImageFile[]) => void;
}

export const TabImagenes = ({ images, onImagesChange }: TabImagenesProps) => {
	const {
		setValue,
		formState: { errors },
	} = useFormContext<CreatePropiedad>();

	const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
	const [isOpen, setIsOpen] = useState(false);

	const removeImage = (imageId: string) => {
		const updatedImages = images.filter((img) => img.id !== imageId);

		setPreviewUrls((prev) => {
			const newUrls = { ...prev };
			delete newUrls[imageId];
			return newUrls;
		});

		onImagesChange(updatedImages);
		setValue(
			"imagenes",
			updatedImages.map((img) => ({ url: img.url, principal: img.principal })),
		);

		setIsOpen(false);
	};

	const setPrincipalImage = (imageId: string) => {
		const updatedImages = images.map((img) => ({
			...img,
			principal: img.id === imageId,
		}));

		onImagesChange(updatedImages);
		setValue(
			"imagenes",
			updatedImages.map((img) => ({ url: img.url, principal: img.principal })),
		);
	};

	const updatePreviewUrls = (urls: Record<string, string>) => {
		setPreviewUrls((prev) => ({ ...prev, ...urls }));
		setValue(
			"imagenes",
			images.map((img) => ({ url: img.url, principal: img.principal })),
		);
	};

	useEffect(() => {
		if (images.length > 0) {
			setPreviewUrls(Object.fromEntries(images.map((img) => [img.id, img.url])));
			setValue(
				"imagenes",
				images.map((img) => ({ url: img.url, principal: img.principal })),
			);
		}
	}, [images, setValue]);

	return (
		<div className="space-y-6">
			<Card className="py-6">
				<CardHeader className="mb-3">
					<CardTitle>Imágenes</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<InputImages
						images={images}
						onImagesChange={onImagesChange}
						updatePreviewUrls={updatePreviewUrls}
					/>
					{errors && <p className="text-sm text-red-500">{errors.imagenes?.message}</p>}

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

											{image.principal ? (
												<Dialog open={isOpen} onOpenChange={setIsOpen}>
													<DialogTrigger asChild>
														<Button
															type="button"
															variant="ghost"
															size="sm"
															className="text-red-500 hover:text-red-700"
														>
															<X className="h-4 w-4" />
														</Button>
													</DialogTrigger>
													<DialogContent>
														<DialogHeader>
															<DialogTitle>Eliminar imagen principal</DialogTitle>
														</DialogHeader>
														<DialogDescription>
															Estás a punto de eliminar la imagen principal.
															<br />
															Si deseas continuar, por favor luego selecciona otra imagen antes de
															guardar los cambios.
														</DialogDescription>
														<DialogFooter>
															<Button variant="destructive" onClick={() => removeImage(image.id)}>
																Eliminar
															</Button>
															<Button variant="secondary" onClick={() => setIsOpen(false)}>
																Cancelar
															</Button>
														</DialogFooter>
													</DialogContent>
												</Dialog>
											) : (
												<Button
													type="button"
													variant="ghost"
													size="sm"
													onClick={() => removeImage(image.id)}
													className="text-red-500 hover:text-red-700"
												>
													<X className="h-4 w-4" />
												</Button>
											)}
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{images.length > 0 && (
						<div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
							<p>• Las imágenes son opcionales</p>
							<p>• Si cargas más de una imagen, una debe ser marcada como principal</p>
							<p>• Puedes cambiar la imagen principal en cualquier momento</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};
