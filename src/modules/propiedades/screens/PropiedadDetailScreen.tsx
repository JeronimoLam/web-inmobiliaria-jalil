import { PageContainer } from "@/components/layouts/PageContainer";
import { Propiedad } from "../types/propiedad.type";
import { PropiedadGalleryPreview } from "../components/propiedad-detail/PropiedadGalleryPreview";

interface PropiedadDetailScreenProps {
	propiedad: Propiedad;
}

export const PropiedadDetailScreen = ({ propiedad }: PropiedadDetailScreenProps) => {
	const precioImporte = propiedad.precios.length > 0 ? propiedad.precios[0].importe : "Consultar";

	return (
		<div>
			<PropiedadGalleryPreview propiedad={propiedad} />
			<PageContainer>
				<h1>Detalles de la Propiedad</h1>
				<p>ID: {propiedad.id}</p>
				<p>Calle: {propiedad.calle}</p>
				<p>Descripción: {propiedad.descripcion}</p>
				<p>Precio: {precioImporte}</p>
				<p>Operación: {propiedad.precios[0]?.estado_publicacion}</p>
			</PageContainer>
		</div>
	);
};
