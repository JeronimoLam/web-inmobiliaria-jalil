import Image from "next/image";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { Propiedad } from "../types/propiedad.type";
import { getPropiedadMapInfo } from "../utils/mapUtils";

interface PropertyMarkerProps {
	propiedad: Propiedad;
	onSelect: (propiedad: Propiedad) => void;
}

export const PropertyMarker = ({ propiedad, onSelect }: PropertyMarkerProps) => {
	const { title, precioDisplay } = getPropiedadMapInfo(propiedad);

	return (
		<AdvancedMarker
			key={propiedad.id}
			position={{
				lat: propiedad.map_location.coordinates[0],
				lng: propiedad.map_location.coordinates[1],
			}}
			onClick={() => onSelect(propiedad)}
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
						className={`font-bold mt-0.5 ${
							precioDisplay === "Consultar" ? "text-blue-600" : "text-green-600"
						}`}
					>
						{precioDisplay}
					</div>
				</div>
			</div>
		</AdvancedMarker>
	);
};
