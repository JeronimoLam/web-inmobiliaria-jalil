"use client";
import { motion, useInView } from "motion/react";
import { useRef, ReactNode } from "react";

type Direction = "left" | "right" | "up" | "down";

interface AnimatedSlideProps {
	children: ReactNode;
	direction?: Direction;
	delay?: number;
	duration?: number;
	offset?: number; // amount of pixels to move the element
	inViewMargin?: string; // margin to trigger the animation
}

type MarginValue = `${number}${"px" | "%"}`;
type MarginType =
	| MarginValue
	| `${MarginValue} ${MarginValue}`
	| `${MarginValue} ${MarginValue} ${MarginValue}`
	| `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;

export const AnimatedSlide = ({
	children,
	direction = "left",
	delay = 0,
	duration = 0.5,
	offset = 20,
	inViewMargin = "-80px",
}: AnimatedSlideProps) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const isInView = useInView(ref, { once: true, margin: inViewMargin as MarginType });

	const initialVariants: Record<Direction, { x?: number; y?: number }> = {
		left: { x: -offset },
		right: { x: offset },
		up: { y: offset },
		down: { y: -offset },
	};

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, ...initialVariants[direction] }}
			animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
			transition={{ duration, delay }}
		>
			{children}
		</motion.div>
	);
};
