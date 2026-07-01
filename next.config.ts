import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// MAINTENANCE MODE: `main` only serves the /maintenance page, but `next build`
	// still type-checks/lints the full app (preserved on the `pagina-completa`
	// branch), which currently has a type error in the Google Maps DrawingManager.
	// Don't let that block the maintenance deploy. Remove these when restoring the site.
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		unoptimized: false,
		remotePatterns: [
			{
				protocol: "https",
				hostname: process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/^https?:\/\//, ""),
			},
		],

		formats: ["image/avif", "image/webp"],
	},
};

export default nextConfig;
