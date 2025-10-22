import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layouts/Footer";
import { globalMetadata } from "@/config/seo/metadata";

const poppins = Poppins({
	variable: "--font-poppins",
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = globalMetadata;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es" suppressHydrationWarning>
			<body className={`${poppins.className} antialiased flex flex-col min-h-screen`}>
				{children}
				<Footer />
			</body>
		</html>
	);
}
