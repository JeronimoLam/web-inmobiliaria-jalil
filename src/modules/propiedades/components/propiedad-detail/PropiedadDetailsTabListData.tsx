import { CheckCircleIcon } from "@/components/Icons";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";

interface PropiedadTabsDataProps {
	propiedad: Propiedad;
}

export const formatWord = (str: string): string => {
	// Mapeo de traducciones específicas para campos que necesitan caracteres especiales
	const fieldTranslations: { [key: string]: string } = {
		banos: "Baños",
		antiguedad: "Antigüedad",
	};

	if (fieldTranslations[str]) {
		return fieldTranslations[str];
	}

	return str.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
};

export const ShowDetailList = ({
	propiedadList,
}: {
	propiedadList: [key: string, value: boolean][];
}) => {
	// Filtrar solo los items con value true
	const filteredList = propiedadList.filter(([, value]) => value);
	return (
		<div>
			<ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2">
				{filteredList.map(([key]) => (
					<li key={key} className="flex gap-2 items-start">
						<CheckCircleIcon className="text-primary flex-shrink-0" width={20} />
						<p className="whitespace-normal break-words">{formatWord(key)}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export const PropiedadServicios = ({ propiedad }: PropiedadTabsDataProps) => {
	const propiedadesServicios = Object.entries(propiedad.servicios);

	return <ShowDetailList propiedadList={propiedadesServicios} />;
};

export const PropiedadAmbientes = ({ propiedad }: PropiedadTabsDataProps) => {
	const propiedadesAmbientes = Object.entries(propiedad.ambientes);

	return <ShowDetailList propiedadList={propiedadesAmbientes} />;
};

export const PropiedadCaracteristicas = ({ propiedad }: PropiedadTabsDataProps) => {
	const propiedadesCaracteristicas = Object.entries(propiedad.caracteristicas);

	return <ShowDetailList propiedadList={propiedadesCaracteristicas} />;
};

export const PropiedadDetalles = ({ propiedad }: PropiedadTabsDataProps) => {
	const excludedFields = ["id", "created_at", "updated_at"];

	const detallesEntries = Object.entries(propiedad.detalles).filter(
		([key, value]) => !excludedFields.includes(key) && !!value,
	);

	// Función para formatear el valor según su tipo
	const formatValue = (key: string, value: unknown): string => {
		if (value instanceof Date) {
			return value.toLocaleDateString();
		}

		const fieldsWithUnits: { [key: string]: string } = {
			medida_frontal: "m",
			medida_profundidad: "m",
			superficie_lote: "m²",
			superficie_cubierta: "m²",
			superficie_total_construida: "m²",
		};

		const unit = fieldsWithUnits[key];
		const formattedValue = String(value);

		return unit ? `${formattedValue} ${unit}` : formattedValue;
	};

	return (
		<div>
			<ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2">
				{detallesEntries.map(([key, value]) => (
					<li key={key} className="flex gap-2 items-start">
						<CheckCircleIcon className="text-primary flex-shrink-0" width={20} />
						<p className="whitespace-normal break-words">
							{formatWord(key)}: <span className="font-semibold">{formatValue(key, value)}</span>
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};
