"use client";
import { motion } from "motion/react";
import Link from "next/link";

interface NavBarTabAnimationProps {
	tabs: { name: string; href: string }[];
	currentPath: string;
}

export const NavBarTabAnimation = ({ tabs, currentPath }: NavBarTabAnimationProps) => {
	return (
		<nav>
			<ul className="flex flex-1 justify-center items-center gap-9">
				{tabs.map((item) => (
					<Link href={item.href} key={item.name}>
						<motion.li initial={false} className="relative py-[5px]">
							<p className="text-sm text-background">{item.name}</p>
							{item.href === currentPath && (
								<motion.div
									className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary"
									layoutId="underline"
									id="underline"
								/>
							)}
						</motion.li>
					</Link>
				))}
			</ul>
		</nav>
	);
};
