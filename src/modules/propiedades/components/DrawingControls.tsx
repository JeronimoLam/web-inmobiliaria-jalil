import { Button } from "@/components/ui/button";
import { EditIcon, XIcon, TrashIcon } from "@/components/Icons";

interface DrawingControlsProps {
	drawingMode: boolean;
	polygonOverlay: google.maps.Polygon | null;
	onStartDrawing: () => void;
	onCancelDrawing: () => void;
	onClearZone: () => void;
}

export const DrawingControls = ({
	drawingMode,
	polygonOverlay,
	onStartDrawing,
	onCancelDrawing,
	onClearZone,
}: DrawingControlsProps) => {
	const getButtonConfig = () => {
		if (polygonOverlay) {
			return { icon: TrashIcon, text: "Borrar Zona", onClick: onClearZone };
		}
		if (drawingMode) {
			return { icon: XIcon, text: "Cancelar", onClick: onCancelDrawing };
		}
		return { icon: EditIcon, text: "Marcar Zona", onClick: onStartDrawing };
	};

	const buttonConfig = getButtonConfig();

	return (
		<div className="absolute bottom-7 left-3 z-50 flex gap-4">
			<Button onClick={buttonConfig.onClick} variant="secondary" size="lg" className="py-6 !px-6">
				<buttonConfig.icon className="mr-2" />
				{buttonConfig.text}
			</Button>
		</div>
	);
};
