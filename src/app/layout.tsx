import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layouts/Footer";

const poppins = Poppins({
	variable: "--font-poppins",
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Jalil Propiedades",
	description:
		"Somos una empresa dedicada y especializada en el asesoramiento integral para operaciones de compraventa y alquiler de inmuebles brindándole al cliente seguridad y calidez en su trato personalizado.",
};

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
