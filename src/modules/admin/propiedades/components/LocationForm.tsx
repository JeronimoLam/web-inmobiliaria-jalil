import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Controller, useFormContext } from "react-hook-form";
import { LocationPicker } from "./LocationPicker";
import { CreatePropiedad } from "../types/create-propiedad.types";

export const LocationForm = () => {
	const {
		control,
		watch,
		setValue,
		formState: { errors },
	} = useFormContext<CreatePropiedad>();

	const handleLocationChange = (coordinates: { lat: number; lng: number }) => {
		setValue("propiedad.map_location.coordinates", [coordinates.lat, coordinates.lng]);
	};

	const currentCoordinates = watch("propiedad.map_location.coordinates");
	const currentCoordinatesObject = { lat: currentCoordinates[0], lng: currentCoordinates[1] };

	return (
		<Card className="py-6">
			<CardHeader>
				<CardTitle>
					Ubicación <span className="text-red-500">*</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Controller
					name="propiedad.map_location.coordinates"
					control={control}
					rules={{
						required: "Debe seleccionar una ubicación en el mapa",
						validate: (value) => {
							if (!value || (value[0] === 0 && value[1] === 0)) {
								return "Debe seleccionar una ubicación en el mapa";
							}
							return true;
						},
					}}
					render={() => (
						<>
							<LocationPicker
								handleCoordinates={handleLocationChange}
								currentCoordinates={currentCoordinatesObject}
							/>
							{errors.propiedad?.map_location?.coordinates && (
								<p className="text-sm text-red-500 mt-2">
									{errors.propiedad.map_location.coordinates.message}
								</p>
							)}
						</>
					)}
				/>
			</CardContent>
		</Card>
	);
};
