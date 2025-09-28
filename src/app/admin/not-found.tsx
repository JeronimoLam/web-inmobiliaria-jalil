import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminHeader } from "@/modules/admin/components/AdminHeader";
import { AdminSidebar } from "@/modules/admin/components/AdminSideBar";
import { createClient } from "@/modules/admin/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function NotFound() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/admin/auth/login");
	}

	return (
		<>
			<SidebarProvider>
				<AdminSidebar />
				<div className="flex-1 w-full">
					<AdminHeader title="404 - Página no encontrada" />
					<div className="flex flex-col items-center justify-center h-screen bg-gray-50">
						<h1 className="text-3xl font-bold text-gray-800 mb-2">404 - Página no encontrada</h1>
						<p className="text-gray-600 mb-4">La página que buscas no existe o fue movida.</p>
						<Button asChild variant="secondary">
							<Link href="/admin/propiedades">Volver al inicio</Link>
						</Button>
					</div>
				</div>
			</SidebarProvider>
		</>
	);
}
