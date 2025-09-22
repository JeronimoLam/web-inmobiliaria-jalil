import { NavBar } from "@/components/layouts/NavBar";
import { OurBestOfferSection } from "@/components/OurBestOfferSection";
import WhatsappFloatingButton from "@/components/WhatsappFloatingButton";
import { FiltersService } from "@/modules/filters/services/filters.service";
import { HomeHeroScreen } from "@/modules/home/screens/HomeHeroScreen";

const heroImages = ["/images/carousel0.webp", "/images/carousel1.webp", "/images/carousel2.webp"];

export default async function Home() {
	const [tiposPropiedad, localidades] = await Promise.all([
		FiltersService.getTiposPropiedad(),
		FiltersService.getLocalidades(),
	]);

	return (
		<>
			<NavBar transparent />
			<main className="pt-[70px]">
				<HomeHeroScreen
					tiposPropiedad={tiposPropiedad}
					localidades={localidades}
					heroImages={heroImages}
				/>
				<div className="pb-14">
					<OurBestOfferSection />
				</div>

				<WhatsappFloatingButton />
			</main>
		</>
	);
}
