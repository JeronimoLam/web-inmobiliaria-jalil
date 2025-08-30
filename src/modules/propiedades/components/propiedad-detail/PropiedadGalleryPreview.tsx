"use client";
import Image from "next/image";
import React from "react";
import { Propiedad } from "../../types/propiedad.type";

interface PropiedadGalleryPreviewProps {
	propiedad: Propiedad;
}

export const PropiedadGalleryPreview = ({ propiedad }: PropiedadGalleryPreviewProps) => {
	const { imagenes } = propiedad;

	return (
		<section className="flex h-[450px] 2xl:h-[550px] gap-[10px]">
			{/* Imagen principal */}
			<div className="w-1/2 h-full relative overflow-hidden">
				{imagenes[0] && (
					<Image
						src={imagenes[0].url}
						alt={propiedad.descripcion}
						fill
						sizes="(max-width: 768px) 100vw, 50vw"
						className="object-cover"
					/>
				)}
			</div>

			{/* Grid de 4 imágenes */}
			<div className="w-1/2 h-full grid grid-cols-2 grid-rows-2 gap-[10px]">
				{imagenes.slice(1, 5).map((img, idx) => {
					const isLastGrid = idx === 3;
					const totalImages = imagenes.length;
					const remaining = totalImages - 5;

					let borderClass = "";
					if (idx === 0) borderClass = "rounded-b-xl"; // arriba izquierda
					if (idx === 1) borderClass = "rounded-b-xl rounded-br-none"; // arriba derecha
					if (idx === 2) borderClass = "rounded-t-xl"; // abajo izquierda
					if (idx === 3) borderClass = "rounded-t-xl rounded-br-none rounded-tr-none"; // abajo derecha
					return (
						<div key={idx} className={`relative overflow-hidden group ${borderClass}`}>
							<Image
								src={img.url}
								alt={propiedad.descripcion}
								fill
								sizes="(max-width: 768px) 100vw, 50vw"
								className="object-cover"
							/>
							{/* Overlay en el último cuadrado si hay más imágenes */}
							{isLastGrid && remaining > 0 && (
								<div
									className="cursor-pointer absolute inset-0 bg-secondary-dark/70 hover:bg-secondary-dark/80 transition-colors flex items-center justify-center z-10"
									role="button"
									onClick={() => alert(`Ver más imágenes (${remaining} restantes)`)}
								>
									<p className="text-background text-xl font-normal">
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
