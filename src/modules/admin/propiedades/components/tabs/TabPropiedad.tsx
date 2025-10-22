import { TipoPropiedad } from "@/modules/filters/types/filters.type";
import { Localidad } from "@/modules/filters/types/filters.type";
import { PricesForm } from "../PricesForm";
import { LocationForm } from "../LocationForm";
import { InfoBasicForm } from "../InfoBasicForm";
import { ExpensasForm } from "../ExpensasForm";

interface TabPropiedadProps {
	tiposPropiedad: TipoPropiedad[];
	localidades: Localidad[];
}

export const TabPropiedad = ({ tiposPropiedad, localidades }: TabPropiedadProps) => {
	return (
		<div className="space-y-6">
			<InfoBasicForm tiposPropiedad={tiposPropiedad} localidades={localidades} />
			<PricesForm />
			<ExpensasForm />
			<LocationForm />
		</div>
	);
};
