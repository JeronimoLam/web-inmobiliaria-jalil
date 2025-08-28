import { Footer } from "@/components/layouts/Footer";
import { NavBar } from "@/components/layouts/NavBar";
import { NosotrosScreen } from "@/modules/nosotros/screens/NosotrosScreen";

export default function Home() {
	return (
		<>
			<NavBar transparent />
			<main className="pt-[70px]">
				<NosotrosScreen />
			</main>
			<Footer />
		</>
	);
}
