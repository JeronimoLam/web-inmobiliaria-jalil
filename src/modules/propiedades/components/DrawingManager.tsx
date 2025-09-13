import { useEffect } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { POLYGON_OPTIONS, PolygonGeoJson, createPolygonFromPath } from "../utils/mapUtils";

interface DrawingManagerProps {
	active: boolean;
	onPolygonComplete: (polygonGeoJson: PolygonGeoJson) => void;
	setPolygonOverlay: (overlay: google.maps.Polygon | null) => void;
}

type OverlayCompleteEvent = {
	type: google.maps.drawing.OverlayType;
	overlay: google.maps.Polygon;
};

export const DrawingManager = ({
	active,
	onPolygonComplete,
	setPolygonOverlay,
}: DrawingManagerProps) => {
	const map = useMap();
	const drawingLib = useMapsLibrary("drawing");

	useEffect(() => {
		if (!map || !drawingLib || !active) return;

		const drawingManager = new drawingLib.DrawingManager({
			drawingMode: google.maps.drawing.OverlayType.POLYGON,
			drawingControl: false,
			polygonOptions: POLYGON_OPTIONS,
		});

		drawingManager.setMap(map);

		const listener = google.maps.event.addListener(
			drawingManager,
			"overlaycomplete",
			(event: OverlayCompleteEvent) => {
				if (event.type === google.maps.drawing.OverlayType.POLYGON) {
					const path = event.overlay.getPath().getArray();
					const polygonGeoJson = createPolygonFromPath(path);
					onPolygonComplete(polygonGeoJson);

					// Guardamos el overlay para mantenerlo visible
					setPolygonOverlay(event.overlay);
				}
			},
		);

		return () => {
			drawingManager.setMap(null);
			google.maps.event.removeListener(listener);
		};
	}, [map, drawingLib, active, onPolygonComplete, setPolygonOverlay]);

	return null;
};
