import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";

interface SpinnerProps {
	size?: number;
	stroke?: number;
	strokeLength?: number;
	bgOpacity?: number;
	speed?: number;
	color?: string;
}

export const Spinner = ({
	size = 40,
	stroke = 3,
	strokeLength = 0.25,
	bgOpacity = 0.1,
	speed = 0.8,
	color = "#ff9900",
}: SpinnerProps) => {
	return (
		<Ring2
			size={size}
			stroke={stroke}
			strokeLength={strokeLength}
			bgOpacity={bgOpacity}
			speed={speed}
			color={color}
		/>
	);
};
