"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PageContainer } from "./PageContainer";
import { TabAnimation } from "../ui/TabAnimation";
import { Logo } from "../Logo";
import { usePathname } from "next/navigation";

const navItems = [
	{ name: "Inicio", href: "/" },
	{ name: "Alquiler", href: "/propiedades/alquiler" },
	{ name: "Venta", href: "/propiedades/venta" },
	{ name: "Transacciones", href: "transacciones" },
	{ name: "Nosotros", href: "/nosotros" },
];

export function NavBar() {
	const [hasBackground, setHasBackground] = useState(false);
	const [activeSection, setActiveSection] = useState("Alquiler");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const currentPage = usePathname();

	useEffect(() => {
		const controlNavbar = () => {
			const currentScrollY = window.scrollY;
			if (currentPage === "/") {
				setHasBackground(currentScrollY > 0);
			} else {
				setHasBackground(true);
			}
		};

		window.addEventListener("scroll", controlNavbar);
		return () => window.removeEventListener("scroll", controlNavbar);
	}, [currentPage]);

	useEffect(() => {
		if (currentPage === "/") {
			setHasBackground(window.scrollY > 0);
		} else {
			setHasBackground(true);
		}
	}, [currentPage]);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const handleNavClick = (sectionName: string) => {
		setActiveSection(sectionName);
		setIsMobileMenuOpen(false);
	};

	return (
		<header>
			<nav
				className={cn(
					"fixed top-0 left-0 right-0 z-50 border-b-muted transition-all ease-in-out",
					hasBackground
						? "bg-secondary-dark border-border duration-300"
						: "bg-transparent border-transparent duration-0",
					currentPage !== "/" && "duration-0",
				)}
			>
				<PageContainer>
					<div className="flex justify-between items-center h-[70px]">
						{/* Logo */}
						<Logo />

						{/* Desktop Navigation */}
						<div className="hidden md:block">
							<TabAnimation tabs={navItems} />
						</div>

						{/* Mobile menu button */}
						<div className="md:hidden">
							<Button
								variant="ghost"
								size="sm"
								onClick={toggleMobileMenu}
								className={`relative w-10 h-10 p-0 hover:bg-transparent`}
								aria-label="Toggle menu"
							>
								<div className="w-6 h-6 flex flex-col justify-center items-center relative">
									<span
										className={cn(
											"absolute bg-background h-0.5 w-6 transition-all duration-300 ease-in-out transform origin-center",
											isMobileMenuOpen
												? "rotate-45 translate-y-0 bg-white"
												: "rotate-0 -translate-y-1.5",
										)}
									/>
									<span
										className={cn(
											"absolute bg-background h-0.5 w-6 transition-all duration-300 ease-in-out transform origin-center",
											isMobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100",
										)}
									/>
									<span
										className={cn(
											"absolute bg-background h-0.5 w-6 transition-all duration-300 ease-in-out transform origin-center",
											isMobileMenuOpen
												? "-rotate-45 translate-y-0 bg-white"
												: "rotate-0 translate-y-1.5",
										)}
									/>
								</div>
							</Button>
						</div>
					</div>
				</PageContainer>
			</nav>

			{/* Mobile Menu Overlay */}
			<div
				className={cn(
					"fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out",
					isMobileMenuOpen ? "visible" : "invisible",
				)}
			>
				{/* Backdrop */}
				<div
					className={cn(
						"absolute inset-0 bg-black transition-opacity duration-300 ease-in-out",
						isMobileMenuOpen ? "opacity-50" : "opacity-0",
					)}
					onClick={() => setIsMobileMenuOpen(false)}
				/>

				{/* Mobile Menu Panel */}
				<div
					className={cn(
						"absolute top-0 left-0 h-full w-full bg-secondary-dark shadow-xl transition-transform duration-300 ease-in-out",
						isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
					)}
				>
					<div className="pt-20 px-6">
						<div className="space-y-1">
							{navItems.map((item, index) => (
								<button
									key={item.name}
									onClick={() => handleNavClick(item.name)}
									className={cn(
										"block w-full text-left px-4 py-4 text-lg font-medium rounded-lg transition-all duration-200 ease-in-out",
										activeSection === item.name
											? "text-primary bg-white/10 border-l-4 border-primary"
											: "text-white hover:text-primary hover:bg-white/10",
									)}
									style={{
										animationDelay: isMobileMenuOpen ? `${index * 100}ms` : "0ms",
									}}
								>
									{item.name}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
