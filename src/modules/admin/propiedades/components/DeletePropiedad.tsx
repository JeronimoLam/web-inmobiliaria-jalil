"use client";

import {
	DialogTitle,
	DialogHeader,
	DialogContent,
	DialogTrigger,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { deletePropiedad } from "../services/delete.propiedad.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function DeletePropiedad({ codigo }: { codigo: number }) {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const handleDelete = async () => {
		try {
			await deletePropiedad(codigo);
			router.refresh();
			setIsOpen(false);
			toast.success("Propiedad eliminada correctamente");
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			setIsOpen(false);
		}
	};

	const handleCancel = () => {
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="destructive" size="sm" title="Eliminar" onClick={() => setIsOpen(true)}>
					<Trash2 className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Eliminar propiedad</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					¿Estás seguro que quieres eliminar esta propiedad? <br /> No podrás revertir la acción.
				</DialogDescription>
				<DialogFooter>
					<Button variant="destructive" onClick={handleDelete}>
						Eliminar
					</Button>
					<Button variant="secondary" onClick={handleCancel}>
						Cancelar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
