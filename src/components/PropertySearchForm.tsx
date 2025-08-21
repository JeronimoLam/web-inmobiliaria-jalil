import { Button } from "@/components/ui/button";
import SelectWithSearch from "@/components/ui/SelectWithSearch";
import { Search } from "lucide-react";
import React from "react";

interface PropertySearchFormProps {
	propertyTypes: { value: string; label: string }[];
	localities: { value: string; label: string }[];
	onSearch: (params: { propertyType: string; locality: string }) => void;
}

export const PropertySearchForm: React.FC<PropertySearchFormProps> = ({
	propertyTypes,
	localities,
	onSearch,
}) => {
	const [propertyType, setPropertyType] = React.useState("");
	const [locality, setLocality] = React.useState("");

	const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSearch({ propertyType, locality });
	};

	return (
		<form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 md:gap-0">
			<SelectWithSearch
				data={propertyTypes}
				label="Tipo de propiedad"
				labelEmpty="No se encontró ningún tipo de propiedad."
				labelSearch="Buscar tipo de propiedad..."
				className="flex-1 md:rounded-r-none px-7 py-selects border-r border-r-input focus-visible:ring-transparent"
				onSelect={setPropertyType}
			/>
			<SelectWithSearch
				data={localities}
				label="Localidad"
				labelEmpty="No se encontró ninguna localidad."
				labelSearch="Buscar localidad..."
				className="flex-1 md:rounded-none px-7 py-selects border-l border-l-input focus-visible:ring-transparent"
				onSelect={setLocality}
			/>
			<Button
				type="submit"
				size="icon"
				className="w-full md:w-fit px-5 py-selects md:rounded-l-none"
			>
				<Search className="!w-6 !h-6 md:!w-5 md:!h-5" strokeWidth={3} />
			</Button>
		</form>
	);
};
