import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface AdminHeaderProps {
	title: string;
	action?: React.ReactNode;
}

export function AdminHeader({ title, action }: AdminHeaderProps) {
	return (
		<header className="py-4 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
			<div className="flex sm:flex-row flex-col w-full items-center justify-between gap-4 px-4 lg:gap-2 lg:px-6">
				<div className="flex items-center gap-1 lg:gap-2">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
					<div>
						<h1 className="text-base font-medium">{title}</h1>
					</div>
				</div>
				{action && <div className="flex items-center">{action}</div>}
			</div>
		</header>
	);
}
