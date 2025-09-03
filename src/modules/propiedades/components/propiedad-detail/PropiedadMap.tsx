"use client";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export const PropiedadMap = ({ latitud, longitud }: { latitud: number; longitud: number }) => {
	return (
		<div className="w-full h-[460px] rounded-xl overflow-hidden">
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
				<Map
					defaultZoom={18}
					defaultCenter={{ lat: latitud, lng: longitud }}
					gestureHandling={"cooperative"}
				>
					<Marker position={{ lat: latitud, lng: longitud }} icon={{ url: "/svgs/map-pin.svg" }} />
				</Map>
			</APIProvider>
		</div>
	);
};
