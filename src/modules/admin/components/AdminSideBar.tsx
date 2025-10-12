"use client";

import * as React from "react";
import { Box, LogOut, Home, Layers, MapPin } from "lucide-react";

import { AdminNavMain } from "@/modules/admin/components/AdminNavMain";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { createClient } from "../utils/supabase/client";
import { useRouter } from "next/navigation";

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Propiedades",
			url: "/admin/propiedades",
			icon: Home,
		},
		{
			title: "Tipos de propiedades",
			url: "/admin/tipos-propiedades",
			icon: Layers,
		},
		{
			title: "Localidades",
			url: "/admin/localidades",
			icon: MapPin,
		},
	],
};

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const supabase = createClient();
	const router = useRouter();

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
		router.push("/admin/auth/login");
	};

	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
							<a href="#">
								<Box className="!size-5" />
								<span className="text-base font-semibold">Panel Administrador</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<AdminNavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<div className="flex flex-col items-center justify-between gap-2">
					<p>Jalil Propiedades</p>
					<Button
						variant="outline"
						onClick={() => {
							signOut();
						}}
					>
						<LogOut />
						Cerrar sesión
					</Button>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
