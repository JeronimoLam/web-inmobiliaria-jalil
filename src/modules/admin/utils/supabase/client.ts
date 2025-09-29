import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
	return createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
	);
}

export function createStorageClient() {
	return createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PUBLISHABLE_KEY!,
	);
}
