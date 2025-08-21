import { PageContainer } from "@/components/layouts/PageContainer";
import { OfferPropertyCard } from "./OfferPropertyCard";
import { GetProperty } from "@/types/property.type";

interface OurBestOfferProps {
	typeOffer: string;
	properties: GetProperty[];
}

export const OurBestOfferSection = ({ typeOffer, properties }: OurBestOfferProps) => {
	return (
		<section>
			<div className="bg-muted-secondary">
				<PageContainer className="py-10">
					<h2 className="flex flex-col text-3xl font-light">
						Nuestra mejor oferta
						<span className="font-bold">{typeOffer}</span>
					</h2>
				</PageContainer>
			</div>
			<PageContainer className="flex gap-8 items-center justify-between py-8">
				{properties.map((property, index) => (
					<OfferPropertyCard
						key={property.code}
						property={property}
						onConsult={() => console.log(`Consultar propiedad ${property.code}`)}
					/>
				))}
			</PageContainer>
		</section>
	);
};
