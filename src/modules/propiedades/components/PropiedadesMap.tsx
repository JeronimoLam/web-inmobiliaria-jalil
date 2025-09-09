"use client";

import { useState } from "react";
import Image from "next/image";
import { APIProvider, Map, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";

import { Propiedad, EstadoPublicacionEnum } from "../types/propiedad.type";
import { buildPropiedadTitle } from "../utils/propiedadPropertyBuilder";
import { MapInfoCard } from "./MapInfoCard";

interface PropiedadesMapProps {
	propiedades: Propiedad[];
	center?: { lat: number; lng: number };
	zoom?: number;
}

const getPropiedadMapInfo = (propiedad: Propiedad) => {
	const title = buildPropiedadTitle(propiedad);

	const precioVenta = propiedad.precios.find(
		(p) => p.estado_publicacion.nombre === EstadoPublicacionEnum.VENTA && p.importe > 0,
	);
	const precioAlquiler = propiedad.precios.find(
		(p) => p.estado_publicacion.nombre === EstadoPublicacionEnum.ALQUILER && p.importe > 0,
	);

	let precioDisplay = "";
	if (precioVenta) {
		precioDisplay = `${precioVenta.divisa} ${precioVenta.importe.toLocaleString()}`;
	} else if (precioAlquiler) {
		precioDisplay = `${precioAlquiler.divisa} ${precioAlquiler.importe.toLocaleString()}/mes`;
	} else {
		precioDisplay = "Consultar";
	}

	return { title, precioDisplay };
};

export const PropiedadesMap = ({ propiedades, center, zoom = 14 }: PropiedadesMapProps) => {
	const [selectedProperty, setSelectedProperty] = useState<Propiedad | null>(null);

	const mapCenter = center || calculateMapCenter(propiedades);

	return (
		<div className="w-full h-full overflow-hidden">
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
				<Map
					mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || ""}
					defaultZoom={zoom}
					defaultCenter={mapCenter}
					gestureHandling={"greedy"}
				>
					{propiedades.map((propiedad) => {
						const { title, precioDisplay } = getPropiedadMapInfo(propiedad);

						return (
							<AdvancedMarker
								key={propiedad.id}
								position={{
									lat: propiedad.map_location.coordinates[0],
									lng: propiedad.map_location.coordinates[1],
								}}
								onClick={() => setSelectedProperty(propiedad)}
							>
								<div className="flex flex-col items-center cursor-pointer">
									<Image
										src="/svgs/map-pin.svg"
										alt={`${title || "Property"} location`}
										width={32}
										height={32}
										className="w-8 h-8"
									/>
									<div className="bg-white px-2 py-1 rounded-md shadow-lg border text-xs font-medium text-gray-800 mt-1 whitespace-nowrap max-w-52 text-center">
										<div className="font-semibold">{title}</div>
										<div
											className={`font-bold mt-0.5 ${precioDisplay === "Consultar" ? "text-blue-600" : "text-green-600"}`}
										>
											{precioDisplay}
										</div>
									</div>
								</div>
							</AdvancedMarker>
						);
					})}

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

// Función auxiliar para calcular el centro del mapa basado en todas las propiedades
function calculateMapCenter(propiedades: Propiedad[]): { lat: number; lng: number } {
	if (propiedades.length === 0) {
		// Coordenadas por defecto
		return { lat: -34.6118, lng: -58.396 }; // Buenos Aires
	}

	if (propiedades.length === 1) {
		return {
			lat: propiedades[0].map_location.coordinates[0],
			lng: propiedades[0].map_location.coordinates[1],
		};
	}

	const sumLat = propiedades.reduce((sum, prop) => sum + prop.map_location.coordinates[0], 0);
	const sumLng = propiedades.reduce((sum, prop) => sum + prop.map_location.coordinates[1], 0);

	return {
		lat: sumLat / propiedades.length,
		lng: sumLng / propiedades.length,
	};
}
