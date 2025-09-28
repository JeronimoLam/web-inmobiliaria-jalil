"use client";

import { login } from "./actions";
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
import { useActionState } from "react";

export default function LoginPage() {
	const [state, loginAction, isPending] = useActionState(login, { error: "" });

	return (
		<div className="min-h-screen flex items-center justify-center bg-secondary-dark">
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
		</div>
	);
}
