"use client";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import React from "react";
import { Propiedad } from "../../types/propiedad.type";

interface PropiedadGalleryPreviewProps {
	propiedad: Propiedad;
}

export const PropiedadGalleryPreview = ({ propiedad }: PropiedadGalleryPreviewProps) => {
	const { imagenes } = propiedad;

	return (
		<section className="flex flex-col sm:flex-row h-[450px] sm:h-[390px] 2xl:h-[550px] gap-[10px]">
			{/* Imagen principal */}
			<div className="sm:w-1/2 h-full relative overflow-hidden group cursor-pointer">
				{imagenes[0] ? (
					<>
						<Image
							src={imagenes[0].url}
							alt={propiedad.descripcion}
							fill
							sizes="(max-width: 768px) 100vw, 50vw"
							className="object-cover"
						/>
						<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
					</>
				) : (
					<div className="flex items-center justify-center w-full h-full bg-gray-200">
						<ImageIcon className="w-16 h-16 text-gray-400" />
					</div>
				)}
			</div>

			{/* Grid de 4 imágenes */}
			<div className="sm:w-1/2 h-full grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 sm:grid-rows-2 gap-[10px]">
				{Array.from({ length: 4 }).map((_, idx) => {
					// Usar imagenes.slice(1, 5) para el grid secundario
					const img = imagenes.slice(1, 5)[idx];
					const isLastGrid = idx === 3;
					const totalImages = imagenes.length;
					const remaining = totalImages - 5;

					let borderClass = "";
					if (idx === 0) borderClass = "rounded-b-xl"; // arriba izquierda
					if (idx === 1)
						borderClass = "rounded-tr-xl sm:rounded-tr-none sm:rounded-b-xl sm:rounded-br-none"; // arriba derecha
					if (idx === 2) borderClass = "rounded-t-xl"; // abajo izquierda
					if (idx === 3)
						borderClass =
							"rounded-tl-xl sm:rounded-tl-none sm:rounded-t-xl sm:rounded-br-none sm:rounded-tr-none"; // abajo derecha
					// Oculta los de la izquierda en mobile
					const hideMobile = idx % 2 === 0 ? "hidden lg:block" : "";
					return (
						<div
							key={idx}
							className={`relative overflow-hidden group ${borderClass} ${hideMobile}`}
						>
							<div className="group cursor-pointer w-full h-full">
								{img ? (
									<>
										<Image
											src={img.url}
											alt={propiedad.descripcion}
											fill
											sizes="(max-width: 768px) 100vw, 50vw"
											className="object-cover"
										/>
										<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
									</>
								) : (
									<div className="cursor-default flex items-center justify-center w-full h-full bg-gray-200">
										<ImageIcon className="w-10 h-10 text-gray-400" />
									</div>
								)}
							</div>

							{/* Overlay en el último cuadrado si hay más imágenes */}
							{isLastGrid && remaining > 0 && (
								<div
									className="cursor-pointer absolute inset-0 bg-secondary-dark/70 hover:bg-secondary-dark/80 transition-colors duration-300 flex items-center justify-center z-10"
									role="button"
									onClick={() => alert(`Ver más imágenes (${remaining} restantes)`)}
								>
									<p className="text-background text-lg sm:text-xl font-normal">
										Ver <span className="font-semibold">{remaining}</span> foto
										{remaining === 1 ? "" : "s"} más
									</p>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</section>
	);
};
