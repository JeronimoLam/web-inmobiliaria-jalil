"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

import NextJsSlide from "./NextJsSlide";
import NextJsThumbnail from "./NextJsThumbnail";
import { Propiedad } from "../../types/propiedad.type";

interface PropiedadGalleryProps {
	propiedad: Propiedad;
}

export const PropiedadGallery = ({ propiedad }: PropiedadGalleryProps) => {
	const { imagenes } = propiedad;

	const [open, setOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	// Mapear imagenes al formato de Lightbox
	const slides = imagenes.map((img) => ({
		src: img.url,
		width: 1280,
		height: 720,
		alt: propiedad.descripcion,
	}));

	return (
		<>
			<section className="flex flex-col sm:flex-row h-[450px] sm:h-[390px] 2xl:h-[550px] gap-[10px]">
				{/* Imagen principal */}
				<div
					className="sm:w-1/2 h-full relative overflow-hidden group cursor-pointer"
					onClick={() => {
						setCurrentIndex(0); // abrir desde la primera imagen
						setOpen(true);
					}}
				>
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
						const img = imagenes.slice(1, 5)[idx];
						const isLastGrid = idx === 3;
						const totalImages = imagenes.length;
						const remaining = totalImages - 5;

						let borderClass = "";
						if (idx === 0) borderClass = "rounded-b-xl";
						if (idx === 1)
							borderClass = "rounded-tr-xl sm:rounded-tr-none sm:rounded-b-xl sm:rounded-br-none";
						if (idx === 2) borderClass = "rounded-t-xl";
						if (idx === 3)
							borderClass =
								"rounded-tl-xl sm:rounded-tl-none sm:rounded-t-xl sm:rounded-br-none sm:rounded-tr-none";

						const hideMobile = idx % 2 === 0 ? "hidden lg:block" : "";

						return (
							<div
								key={idx}
								className={`relative overflow-hidden group ${borderClass} ${hideMobile}`}
							>
								<div
									className="relative group cursor-pointer w-full h-full"
									onClick={() => {
										if (img) {
											setCurrentIndex(idx + 1); // +1 porque empiezan desde la segunda imagen
											setOpen(true);
										}
									}}
								>
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
										onClick={() => {
											setCurrentIndex(0); // abrir desde la primera imagen
											setOpen(true);
										}}
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

			<Lightbox
				open={open}
				close={() => setOpen(false)}
				index={currentIndex}
				slides={slides}
				render={{
					slide: NextJsSlide,
					thumbnail: NextJsThumbnail,
				}}
				plugins={[Thumbnails, Zoom, Fullscreen, Counter]}
				zoom={{
					maxZoomPixelRatio: 2, // cantidad max de zooms
					zoomInMultiplier: 2, // cuánto escala por "tick" de zoom
					doubleTapDelay: 300, // delay para detectar doble click
					doubleClickDelay: 300,
					doubleClickMaxStops: 2,
					keyboardMoveDistance: 50, // flechas cuando está en zoom
					wheelZoomDistanceFactor: 100, // sensibilidad al scroll
					pinchZoomDistanceFactor: 100, // sensibilidad al pinch
				}}
				controller={{
					closeOnBackdropClick: true, // cerrar al clickear afuera
					closeOnPullDown: false, // permitir cerrar al hacer pull down
				}}
				carousel={{
					finite: true, // no loop
				}}
			/>
		</>
	);
};
