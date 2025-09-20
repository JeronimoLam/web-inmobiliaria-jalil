import { getPropiedades } from "@/modules/propiedades/services/get-propiedades.service";
import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";
import { PropiedadFilters } from "@/modules/filters/types/filters.type";
import PropiedadesList from "../PropiedadesList";
import { PropiedadesMapContainer } from "../PropiedadesMapContainer";
import { PropiedadesMap } from "../PropiedadesMap";
import { PageContainer } from "@/components/layouts/PageContainer";

interface Props {
	operacion: string;
	filtersParams: PropiedadFilters;
	paginationParams: { page: number | "" | undefined; limit: number | "" | undefined };
}

export default async function PropiedadesContainer({
	operacion,
	filtersParams,
	paginationParams,
}: Props) {
	const propiedades = await getPropiedades({
		operacion: operacion === "venta" ? OperacionesEnum.VENTA : OperacionesEnum.ALQUILER,
		filters: filtersParams,
		pagination: {
			page: paginationParams.page ? paginationParams.page : 1,
			limit: paginationParams.limit ? paginationParams.limit : 5,
		},
	});

	return (
		<>
			<PageContainer>
				<PropiedadesList propiedades={propiedades} />
			</PageContainer>
			<PropiedadesMapContainer>
				<PropiedadesMap propiedades={propiedades.data} />
			</PropiedadesMapContainer>
		</>
	);
}
