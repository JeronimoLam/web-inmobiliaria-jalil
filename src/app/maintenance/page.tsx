import type { Metadata } from "next";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
	title: "Sitio en mantenimiento | Jalil Propiedades",
	description: "Estamos realizando tareas de mantenimiento. Volveremos pronto.",
	robots: { index: false, follow: false },
};

export default function MaintenancePage() {
	return (
		<main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-20 text-center">
			<Logo className="w-36 md:w-44" />

			<div className="flex flex-col items-center gap-4">
				<span className="rounded-full bg-primary/15 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-primary">
					Out of service
				</span>
				<h1 className="text-3xl font-semibold text-secondary md:text-4xl">
					Sitio en mantenimiento
				</h1>
				<p className="max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
					Estamos trabajando para mejorar tu experiencia. El sitio no está disponible por el
					momento. Volveremos a estar online muy pronto.
				</p>
			</div>

			<p className="text-sm text-muted-foreground">
				¿Necesitás contactarnos? Escribinos a{" "}
				<a
					href="mailto:info@jalilpropiedades.com.ar"
					className="font-medium text-primary hover:underline"
				>
					info@jalilpropiedades.com.ar
				</a>{" "}
				o llamanos al{" "}
				<a href="tel:02214217393" className="font-medium text-primary hover:underline">
					(0221) 421-7393
				</a>
				.
			</p>
		</main>
	);
}
