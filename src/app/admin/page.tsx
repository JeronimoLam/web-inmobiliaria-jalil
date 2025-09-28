import { redirect } from "next/navigation";

import { createClient } from "@/modules/admin/utils/supabase/server";

export default async function PrivatePage() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/admin/auth/login");
	}

	redirect("/admin/propiedades");
}
