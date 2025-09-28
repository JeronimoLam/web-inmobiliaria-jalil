import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/modules/admin/components/AdminSideBar";
import { createClient } from "@/modules/admin/utils/supabase/server";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

export default async function AdminPagesLayout({ children }: { children: React.ReactNode }) {
	const supabase = await createClient();

	const { error } = await supabase.auth.getUser();

	if (error) {
		redirect("/admin/auth/login");
	}

	return (
		<main>
			<div className="flex">
				<SidebarProvider>
					<div>
						<AdminSidebar />
					</div>
					<div className="flex-1 w-full">{children}</div>
				</SidebarProvider>
				<Toaster position="top-center" richColors />
			</div>
		</main>
	);
}
