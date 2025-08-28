"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PageContainer } from "./PageContainer";
import { NavBarTabAnimation } from "./NavBarTabAnimation";
import { Logo } from "../Logo";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
	{ name: "Inicio", href: "/" },
	{ name: "Alquiler", href: "/propiedades/alquiler" },
	{ name: "Venta", href: "/propiedades/venta" },
	{ name: "Tasaciones", href: "/tasaciones" },
	{ name: "Nosotros", href: "/nosotros" },
];

interface NavBarProps {
	transparent?: boolean;
}

export function NavBar({ transparent }: NavBarProps) {
	const [hasBackground, setHasBackground] = useState(() => (transparent ? false : true));
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const router = useRouter();
	const currentPage = usePathname();

	useEffect(() => {
		const controlNavbar = () => {
			const currentScrollY = window.scrollY;
			if (transparent) {
				setHasBackground(currentScrollY > 0);
			} else {
				setHasBackground(true);
			}
		};

		window.addEventListener("scroll", controlNavbar);
		return () => window.removeEventListener("scroll", controlNavbar);
	}, [currentPage, transparent]);

	useEffect(() => {
		if (currentPage === "/" || currentPage === "/nosotros") {
			setHasBackground(window.scrollY > 0);
		} else {
			setHasBackground(true);
		}
	}, [currentPage]);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const handleNavClick = (href: string) => {
		setIsMobileMenuOpen(false);
		router.push(href);
	};

	return (
		<header>
			<nav>
				<div
					className={cn(
						"fixed top-0 left-0 right-0 z-50 border-b-muted duration-300 transition-all ease-in-out",
						hasBackground ? "bg-secondary-dark border-border" : "bg-transparent border-transparent",
						currentPage !== "/" && currentPage !== "/nosotros" && "duration-0",
					)}
				>
					<PageContainer>
						<div className="flex justify-between items-center h-[70px]">
							{/* Logo */}
							<Logo />

							{/* Desktop Navigation */}
							<div className="hidden md:block">
								<NavBarTabAnimation tabs={navItems} currentPath={currentPage} />
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
				</div>

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
										onClick={() => handleNavClick(item.href)}
										className={cn(
											"block w-full text-left px-4 py-4 text-lg font-medium rounded-lg transition-all duration-200 ease-in-out",
											currentPage === item.href
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
			</nav>
		</header>
	);
}
