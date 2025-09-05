import Image from "next/image";
import {
	isImageFitCover,
	isImageSlide,
	useLightboxProps,
	useLightboxState,
	Slide,
	RenderSlideProps,
} from "yet-another-react-lightbox";

function isNextJsImage(slide: Slide) {
	return isImageSlide(slide) && typeof slide.width === "number" && typeof slide.height === "number";
}

export default function NextJsSlide({ slide, offset, rect }: RenderSlideProps) {
	const {
		on: { click },
		carousel: { imageFit },
	} = useLightboxProps();

	const { currentIndex } = useLightboxState();

	const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

	if (!isNextJsImage(slide)) return null;

	const slideHeight = slide.height || 1;
	const slideWidth = slide.width || 1;

	const width = !cover
		? Math.round(Math.min(rect.width, (rect.height / slideHeight) * slideWidth))
		: rect.width;

	const height = !cover
		? Math.round(Math.min(rect.height, (rect.width / slideWidth) * slideHeight))
		: rect.height;

	return (
		<div style={{ position: "relative", width, height }}>
			<Image
				fill
				alt={slide.alt || ""}
				src={slide.src}
				loading="lazy"
				draggable={false}
				style={{
					objectFit: cover ? "cover" : "contain",
					cursor: click ? "pointer" : undefined,
				}}
				sizes={`${Math.ceil((width / rect.width) * 100)}vw`}
				onClick={offset === 0 ? () => click?.({ index: currentIndex }) : undefined}
			/>
		</div>
	);
}
