"use client";
import Image from "next/image";

interface HomeHeroSliderProps {
	images: string[];
	slideDuration?: number; // duración total por slide (en segundos)
}

export function HomeHeroSlider({ images, slideDuration = 5 }: HomeHeroSliderProps) {
	const totalDuration = slideDuration * images.length;

	return (
		<div id="home-hero-slider" className="relative h-dvh w-full overflow-hidden -z-10">
			{images.map((src, index) => (
				<div
					key={index}
					className="absolute inset-0 opacity-0 transition-opacity duration-1000"
					style={{
						animation: `cycle ${totalDuration}s infinite`,
						animationDelay: `${slideDuration * index}s`,
					}}
				>
					<Image
						src={src}
						alt={`Slide ${index + 1}`}
						fill
						className="object-cover"
						priority={index === 0}
					/>
					<div className="absolute inset-0 bg-black opacity-30" />
				</div>
			))}
		</div>
	);
}
