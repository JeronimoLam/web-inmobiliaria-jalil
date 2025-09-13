import { NavBar } from "@/components/layouts/NavBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<>
			<NavBar />
			<div className="flex flex-col items-center justify-center h-screen bg-gray-50">
				<h1 className="text-3xl font-bold text-gray-800 mb-2">404 - Página no encontrada</h1>
				<p className="text-gray-600 mb-4">La página que buscas no existe o fue movida.</p>
				<Button asChild variant="secondary">
					<Link href="/">Volver al inicio</Link>
				</Button>
			</div>
		</>
	);
}
