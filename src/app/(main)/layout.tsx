import { NavBar } from "@/components/layouts/NavBar";

export default function PropiedadesLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<NavBar />
			<main className="pt-[70px]">{children}</main>
		</>
	);
}
