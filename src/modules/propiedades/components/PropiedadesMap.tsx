"use client";

import { APIProvider, Map, InfoWindow } from "@vis.gl/react-google-maps";
import { Propiedad } from "../types/propiedad.type";
import { MapInfoCard } from "./MapInfoCard";
import { PropertyMarker } from "./PropertyMarker";
import { DrawingControls } from "./DrawingControls";
import { DrawingManager } from "./DrawingManager";
import { useMapLogic } from "../hooks/useMapLogic";
import { MapCenter } from "../utils/mapUtils";

interface PropiedadesMapProps {
	propiedades: Propiedad[];
	center?: MapCenter;
	zoom?: number;
}

export const PropiedadesMap = ({ propiedades, center, zoom = 14 }: PropiedadesMapProps) => {
	const {
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
	} = useMapLogic({ propiedades, center });

	return (
		<div className="w-full h-full overflow-hidden relative">
			<DrawingControls
				drawingMode={drawingMode}
				polygonOverlay={polygonOverlay}
				onStartDrawing={handleStartDrawing}
				onCancelDrawing={handleCancelDrawing}
				onClearZone={handleClearZone}
			/>

			<APIProvider
				apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
				libraries={["drawing"]}
			>
				<Map
					mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || ""}
					defaultZoom={zoom}
					defaultCenter={mapCenter}
					gestureHandling={"greedy"}
				>
					{drawingMode && (
						<DrawingManager
							active={drawingMode}
							onPolygonComplete={handlePolygonComplete}
							setPolygonOverlay={setPolygonOverlay}
						/>
					)}

					{filteredProperties.map((propiedad) => (
						<PropertyMarker
							key={propiedad.id}
							propiedad={propiedad}
							onSelect={setSelectedProperty}
						/>
					))}

					{selectedProperty && (
						<InfoWindow
							position={{
								lat: selectedProperty.map_location.coordinates[0],
								lng: selectedProperty.map_location.coordinates[1],
							}}
							onCloseClick={() => setSelectedProperty(null)}
						>
							<MapInfoCard propiedad={selectedProperty} />
						</InfoWindow>
					)}
				</Map>
			</APIProvider>
		</div>
	);
};
