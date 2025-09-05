import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		// Configuración para desarrollo: permite cualquier hostname
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**", // wildcard para desarrollo
			},
		],

		// Configuración recomendada para producción:
		// remotePatterns: [
		//   { protocol: 'https', hostname: 'ejemplo.com' },
		//   { protocol: 'https', hostname: 'otra-imagen.com' },
		// ],
	},
};

export default nextConfig;
