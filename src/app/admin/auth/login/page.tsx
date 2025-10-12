"use client";

import { login } from "@/modules/admin/auth/login.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { useActionState, useEffect, useState } from "react";
import { createClient } from "@/modules/admin/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/Spinner";

export default function LoginPage() {
	const [state, loginAction, isPending] = useActionState(login, { error: "" });
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			const supabase = createClient();
			const { data } = await supabase.auth.getUser();
			if (data?.user) {
				router.replace("/admin/propiedades");
			} else {
				setLoading(false);
			}
		};
		checkAuth();
	}, [router]);

	if (loading) {
		return (
			<main className="min-h-screen flex items-center justify-center bg-secondary-dark">
				<Spinner size={60} />
			</main>
		);
	}

	return (
		<main className="min-h-screen flex items-center justify-center bg-secondary-dark">
			<Card className="w-full max-w-md shadow-lg py-8 space-y-8">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">Bienvenido</CardTitle>
					<CardDescription className="text-center">
						Inicia sesión con una cuenta de administrador
					</CardDescription>
				</CardHeader>

				<form className="space-y-8" action={loginAction}>
					<CardContent className="space-y-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Correo electrónico</Label>
							<Input id="email" name="email" type="email" required />
						</div>

						<div className="grid gap-2">
							<Label htmlFor="password">Contraseña</Label>
							<Input id="password" name="password" type="password" required />
						</div>

						{state?.error && <p className="text-sm text-red-500 font-medium">{state.error}</p>}
					</CardContent>

					<CardFooter className="flex flex-col gap-3">
						<Button type="submit" className="w-full" disabled={isPending}>
							{isPending ? "Ingresando..." : "Iniciar sesión"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</main>
	);
}
