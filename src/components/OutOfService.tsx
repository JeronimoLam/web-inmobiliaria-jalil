/**
 * Single, self-contained "Out of Service" view.
 *
 * `main` intentionally serves ONLY this page while the site is offline.
 * The full application lives on the `pagina-completa` branch.
 */
export function OutOfService() {
	return (
		<main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-16 text-center">
			{/* Subtle brand accents */}
			<div
				aria-hidden
				className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
			/>

			<div className="relative flex w-full max-w-xl flex-col items-center gap-8">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src="/images/logo.webp" alt="Jalil Propiedades" className="w-36 md:w-44" />

				<span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
					<span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
					Out of service
				</span>

				<div className="flex flex-col items-center gap-4">
					<h1 className="text-4xl font-bold tracking-tight text-secondary md:text-5xl">
						Sitio fuera de servicio
					</h1>
					<p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
						Estamos realizando tareas de mantenimiento. El sitio no está disponible por el
						momento. Volveremos a estar online muy pronto.
					</p>
				</div>

				<div className="h-px w-16 bg-primary/40" />

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
			</div>
		</main>
	);
}
