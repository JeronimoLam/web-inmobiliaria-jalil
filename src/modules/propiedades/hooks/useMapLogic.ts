import { useState, useEffect, useCallback, useMemo } from "react";
import { Propiedad } from "../types/propiedad.type";
import {
	calculateMapCenter,
	filterPropertiesInPolygon,
	MapCenter,
	PolygonGeoJson,
} from "../utils/mapUtils";

interface UseMapLogicProps {
	propiedades: Propiedad[];
	center?: MapCenter;
}

export const useMapLogic = ({ propiedades, center }: UseMapLogicProps) => {
	const [selectedProperty, setSelectedProperty] = useState<Propiedad | null>(null);
	const [filteredProperties, setFilteredProperties] = useState<Propiedad[]>(propiedades);
	const [drawingMode, setDrawingMode] = useState(false);
	const [polygonOverlay, setPolygonOverlay] = useState<google.maps.Polygon | null>(null);

	// Actualizar filteredProperties cuando cambie propiedades
	useEffect(() => {
		if (!polygonOverlay) {
			setFilteredProperties(propiedades);
		}
	}, [propiedades, polygonOverlay]);

	const mapCenter = useMemo(() => center || calculateMapCenter(propiedades), [center, propiedades]);

	const handlePolygonComplete = useCallback(
		(polygonGeoJson: PolygonGeoJson) => {
			const propsInside = filterPropertiesInPolygon(propiedades, polygonGeoJson);
			setFilteredProperties(propsInside);
			setDrawingMode(false);
		},
		[propiedades],
	);

	const handleClearZone = useCallback(() => {
		setFilteredProperties(propiedades);
		setDrawingMode(false);
		if (polygonOverlay) {
			polygonOverlay.setMap(null);
			setPolygonOverlay(null);
		}
	}, [propiedades, polygonOverlay]);

	const handleCancelDrawing = useCallback(() => {
		setDrawingMode(false);
	}, []);

	const handleStartDrawing = useCallback(() => {
		setDrawingMode(true);
	}, []);

	return {
		selectedProperty,
		setSelectedProperty,
		filteredProperties,
		drawingMode,
		polygonOverlay,
		setPolygonOverlay,
		mapCenter,
		handlePolygonComplete,
		handleClearZone,
		handleCancelDrawing,
		handleStartDrawing,
	};
};
