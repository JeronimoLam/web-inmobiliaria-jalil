import Image from "next/image";
import Link from "next/link";

interface LogoProps {
	className?: string;
}

export const Logo = ({ className }: LogoProps) => {
	return (
		<div className="flex-shrink-0">
			<div className="flex items-center">
				<Link href="/">
					<picture>
						<Image
							src="/images/logo.webp"
							alt="Logo"
							width={336}
							height={206}
							className={`w-20 object-cover ${className}`}
							priority
						/>
					</picture>
				</Link>
			</div>
		</div>
	);
};
