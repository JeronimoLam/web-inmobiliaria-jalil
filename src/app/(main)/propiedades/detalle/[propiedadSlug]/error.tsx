"use client";

import Link from "next/link";

interface ErrorPageProps {
	error: Error;
	reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl font-bold text-red-700 mb-2">¡Ocurrió un error!</h1>
			<p className="text-red-600 mb-4">{error?.message || "Algo salió mal."}</p>
			<button
				className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
				onClick={reset}
			>
				Reintentar
			</button>
			<Link href="/" className="mt-4 text-blue-600 hover:underline">
				Volver al inicio
			</Link>
		</div>
	);
}
