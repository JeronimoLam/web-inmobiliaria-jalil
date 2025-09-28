import { createClient } from "@/modules/admin/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminPagesLayout({ children }: { children: React.ReactNode }) {
	const supabase = await createClient();

	const { error, data } = await supabase.auth.getUser();

	if (error) {
		redirect("/admin/auth/login");
	}

	return (
		<div>
			<h1>Bienvenido, {data?.user?.email}</h1>
			{children}
		</div>
	);
}
