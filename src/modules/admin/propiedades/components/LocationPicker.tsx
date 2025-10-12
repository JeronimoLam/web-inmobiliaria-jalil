import React, { useState, useCallback, useRef, useEffect } from "react";
import {
	APIProvider,
	Map,
	AdvancedMarker,
	useMapsLibrary,
	MapMouseEvent,
} from "@vis.gl/react-google-maps";
import { Input } from "@/components/ui/input";
import { useMap } from "@vis.gl/react-google-maps";
import Image from "next/image";

const DEFAULT_MAP_CENTER = { lat: -34.9212050106256, lng: -57.9538577052916 };

interface PlaceAutocompleteProps {
	onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
	selectedAddress: string;
}

const PlaceAutocomplete = ({ onPlaceSelect, selectedAddress }: PlaceAutocompleteProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const places = useMapsLibrary("places");

	useEffect(() => {
		if (!places || !inputRef.current) return;

		const options = {
			fields: ["geometry", "name", "formatted_address"],
		};

		const autocomplete = new places.Autocomplete(inputRef.current, options);

		autocomplete.addListener("place_changed", () => {
			const place = autocomplete.getPlace();
			if (place.geometry?.location) {
				onPlaceSelect(place);
			}
		});
	}, [places, onPlaceSelect]);

	return (
		<div className="relative">
			<Input
				ref={inputRef}
				type="search"
				placeholder="Buscar dirección..."
				defaultValue={selectedAddress || ""}
			/>
		</div>
	);
};

interface MapComponentProps {
	handleCoordinates: (coordinates: { lat: number; lng: number }) => void;
	currentCoordinates: { lat: number; lng: number };
}

const MapComponent = ({ handleCoordinates, currentCoordinates }: MapComponentProps) => {
	const hasCoordinates = currentCoordinates.lat !== 0 && currentCoordinates.lng !== 0;
	const hasCoordinatesZoom = hasCoordinates ? 18 : 13;
	const map = useMap();

	const [markerPosition, setMarkerPosition] = useState(
		hasCoordinates ? currentCoordinates : DEFAULT_MAP_CENTER,
	);
	const [mapCenter, setMapCenter] = useState(
		hasCoordinates ? currentCoordinates : DEFAULT_MAP_CENTER,
	);
	const [selectedAddress, setSelectedAddress] = useState("");

	useEffect(() => {
		if (map && hasCoordinates) {
			map.panTo(currentCoordinates);
			map.setZoom(hasCoordinatesZoom);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [map, hasCoordinates]);

	useEffect(() => {
		if (hasCoordinates) {
			setMarkerPosition(currentCoordinates);
			setMapCenter(currentCoordinates);
		}
	}, [currentCoordinates, hasCoordinates]);

	const handlePlaceSelect = useCallback(
		(place: google.maps.places.PlaceResult) => {
			const location = place.geometry?.location;
			if (!location) return;

			const newPosition = {
				lat: location.lat(),
				lng: location.lng(),
			};

			setMarkerPosition(newPosition);
			setMapCenter(newPosition);
			handleCoordinates(newPosition);
			setSelectedAddress(place.formatted_address || place.name || "");

			if (map) {
				map.panTo(newPosition);
				map.setZoom(hasCoordinatesZoom);
			}
		},
		[map, handleCoordinates, hasCoordinatesZoom],
	);

	const handleMapClick = useCallback(
		(event: MapMouseEvent) => {
			const latLng = event.detail.latLng;
			if (!latLng) return;

			const newPosition = {
				lat: latLng.lat,
				lng: latLng.lng,
			};

			setMarkerPosition(newPosition);
			setMapCenter(newPosition);
			handleCoordinates(newPosition);
			setSelectedAddress("");
		},
		[handleCoordinates],
	);

	return (
		<div className="w-full h-[500px] flex flex-col border rounded-lg overflow-hidden">
			<div className="p-4 border-b">
				<PlaceAutocomplete onPlaceSelect={handlePlaceSelect} selectedAddress={selectedAddress} />
				<div className="mt-2 text-[14px] text-muted-foreground">
					<p>💡 Busca una dirección o haz clic en el mapa para seleccionar una ubicación.</p>
					<p className="text-xs text-muted-foreground mt-1">
						Esta ubicación se usa para guardar las coordenadas de la propiedad y mostrarla en el
						mapa del sitio público.
					</p>
				</div>
			</div>

			<div
				className="flex-1 h-[400px]"
				style={{
					position: "relative",
					overflow: "hidden",
				}}
			>
				<Map
					mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || ""}
					defaultCenter={mapCenter}
					defaultZoom={hasCoordinatesZoom}
					onClick={handleMapClick}
					gestureHandling="greedy"
				>
					<AdvancedMarker position={markerPosition}>
						<Image
							src="/svgs/map-pin.svg"
							alt="Property location"
							width={32}
							height={32}
							className="w-8 h-8"
						/>
					</AdvancedMarker>
				</Map>
			</div>
		</div>
	);
};

interface LocationPickerProps {
	handleCoordinates: (coordinates: { lat: number; lng: number }) => void;
	currentCoordinates: { lat: number; lng: number };
}

export const LocationPicker = ({ currentCoordinates, handleCoordinates }: LocationPickerProps) => {
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

	if (!apiKey) {
		return (
			<div className="w-full h-[500px] flex items-center justify-center border rounded-lg bg-muted">
				<div className="text-center">
					<div className="text-lg font-semibold text-muted-foreground mb-2">
						⚠️ API Key de Google Maps no configurada
					</div>
					<div className="text-sm text-muted-foreground">
						Configura NEXT_PUBLIC_GOOGLE_MAPS_API_KEY en tu archivo .env
					</div>
				</div>
			</div>
		);
	}

	return (
		<APIProvider apiKey={apiKey} libraries={["places"]}>
			<MapComponent handleCoordinates={handleCoordinates} currentCoordinates={currentCoordinates} />
		</APIProvider>
	);
};
