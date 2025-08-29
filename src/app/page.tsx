import { Footer } from "@/components/layouts/Footer";
import { NavBar } from "@/components/layouts/NavBar";
import { OurBestOfferSection } from "@/components/OurBestOfferSection";
import { HomeHeroScreen } from "@/modules/home/screens/HomeHeroScreen";

export default async function Home() {
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
			</main>
			<Footer />
		</>
	);
}

const heroImages = ["/images/carousel0.webp", "/images/carousel1.webp", "/images/carousel2.webp"];

const tiposPropiedad = [
	{
		value: "casa",
		label: "Casa",
	},
	{
		value: "departamento",
		label: "Departamento",
	},
	{
		value: "terreno",
		label: "Terreno",
	},
	{
		value: "local",
		label: "Local",
	},
	{
		value: "construccion",
		label: "Construcción",
	},
	{
		value: "cochera",
		label: "Cochera",
	},
];

const localidades = [
	{
		value: "la-plata",
		label: "La Plata",
	},
	{
		value: "buenos-aires",
		label: "Buenos Aires",
	},
	{
		value: "city-bell",
		label: "City Bell",
	},
	{
		value: "berisso",
		label: "Berisso",
	},
	{
		value: "tolosa",
		label: "Tolosa",
	},
	{
		value: "ringuelet",
		label: "Ringuelet",
	},
	{
		value: "gorina",
		label: "Gorina",
	},
	{
		value: "melchor-romero",
		label: "Melchor Romero",
	},
	{
		value: "el-pato",
		label: "El Pato",
	},
	{
		value: "san-carlos",
		label: "San Carlos",
	},
	{
		value: "villa-elisa",
		label: "Villa Elisa",
	},
];
