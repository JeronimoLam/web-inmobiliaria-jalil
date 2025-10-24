import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		unoptimized: false,
		remotePatterns: [
			{
				protocol: "https",
				hostname: process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/^https?:\/\//, ""),
			},
			{ protocol: "https", hostname: "images.unsplash.com" },
			{ protocol: "https", hostname: "ejemplo.com" },
		],

		formats: ["image/avif", "image/webp"],
	},
};

export default nextConfig;
