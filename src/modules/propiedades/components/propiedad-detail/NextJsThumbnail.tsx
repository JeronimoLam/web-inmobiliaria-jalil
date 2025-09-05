import Image from "next/image";
import { RenderThumbnailProps } from "yet-another-react-lightbox";

export default function NextJsThumbnail({ slide }: RenderThumbnailProps) {
	return (
		<div style={{ position: "relative", width: 120, height: 80 }}>
			<Image
				fill
				alt={slide.alt || ""}
				src={slide.src}
				loading="lazy"
				draggable={false}
				style={{ objectFit: "cover" }}
				sizes="(max-width: 768px) 100vw, 120px"
			/>
		</div>
	);
}
