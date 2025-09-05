"use client";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import Image from "next/image";

export const PropiedadesMap = ({ latitud, longitud }: { latitud: number; longitud: number }) => {
	return (
		<div className="w-full h-full overflow-hidden">
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
				<Map
					mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || ""}
					defaultZoom={18}
					defaultCenter={{ lat: latitud, lng: longitud }}
					gestureHandling={"cooperative"}
				>
					<AdvancedMarker position={{ lat: latitud, lng: longitud }}>
						<Image
							src="/svgs/map-pin.svg"
							alt="Property location"
							width={32}
							height={32}
							className="w-8 h-8"
						/>
					</AdvancedMarker>
				</Map>
			</APIProvider>
		</div>
	);
};
