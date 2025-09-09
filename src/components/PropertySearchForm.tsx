import { Button } from "@/components/ui/button";
import SelectWithSearch from "@/components/ui/SelectWithSearch";
import { Search } from "lucide-react";
import React from "react";

interface PropertySearchFormProps {
	tiposPropiedad: { value: string; label: string }[];
	localidades: { value: string; label: string }[];
	withBorder?: boolean;
	onSearch: (params: { tipoPropiedad: string; localidad: string }) => void;
}

export const PropertySearchForm: React.FC<PropertySearchFormProps> = ({
	tiposPropiedad,
	localidades,
	onSearch,
	withBorder = false,
}) => {
	const [tipoPropiedad, setTipoPropiedad] = React.useState("");
	const [localidad, setLocalidad] = React.useState("");

	const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSearch({ tipoPropiedad, localidad });
	};

	return (
		<form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 md:gap-0">
			<SelectWithSearch
				data={tiposPropiedad}
				label="Tipo de propiedad"
				labelEmpty="No se encontró ningún tipo de propiedad."
				labelSearch="Buscar tipo de propiedad..."
				className={`flex-1 md:rounded-r-none px-7 py-selects border-r border-r-input focus-visible:ring-transparent ${withBorder && "border border-muted-foreground/30"}`}
				onSelect={setTipoPropiedad}
			/>
			<SelectWithSearch
				data={localidades}
				label="Localidad"
				labelEmpty="No se encontró ninguna localidad."
				labelSearch="Buscar localidad..."
				className={`flex-1 md:rounded-none px-7 py-selects border-l border-l-input focus-visible:ring-transparent ${withBorder && "border md:border-x-0 border-muted-foreground/30"}`}
				onSelect={setLocalidad}
			/>
			<Button
				type="submit"
				size="icon"
				className={`w-full md:w-fit px-5 py-selects md:rounded-l-none ${withBorder && "border border-primary"}`}
			>
				<Search className="!w-6 !h-6 md:!w-5 md:!h-5" strokeWidth={3} />
			</Button>
		</form>
	);
};
