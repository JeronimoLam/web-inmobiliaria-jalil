"use client";
import Link from "next/link";

interface NavBarProps {
	tabs: { name: string; href: string }[];
	currentPath: string;
}

export const NavBarTabAnimation = ({ tabs, currentPath }: NavBarProps) => {
	return (
		<nav>
			<ul className="flex flex-1 justify-center items-center gap-9">
				{tabs.map((item) => {
					const isActive = item.href === currentPath;
					return (
						<Link href={item.href} key={item.name}>
							<li
								className={`relative py-[5px] text-sm cursor-pointer transition-colors text-background`}
							>
								{item.name}
								<span
									className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-primary transition-opacity ${
										isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
									}`}
								/>
							</li>
						</Link>
					);
				})}
			</ul>
		</nav>
	);
};
