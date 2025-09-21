import { LineSpinner } from "ldrs/react";
import "ldrs/react/LineSpinner.css";

interface SpinnerProps {
	size?: number;
	stroke?: number;
	speed?: number;
	color?: string;
}

export const Spinner = ({
	size = 40,
	stroke = 3,
	speed = 0.8,
	color = "#ff9900",
}: SpinnerProps) => {
	return <LineSpinner size={size} stroke={stroke} speed={speed} color={color} />;
};
