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
import { Spinner } from "@/components/ui/Spinner";

interface DeletePropiedadProps {
	id: number;
	context: "table" | "detail";
	text?: boolean;
}

export const DeletePropiedadButton = ({ id, context, text = false }: DeletePropiedadProps) => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleDelete = async () => {
		try {
			setLoading(true);
			await deletePropiedad(id);
			if (context === "detail") {
				router.push("/admin/propiedades");
			} else {
				router.refresh();
			}
			setIsOpen(false);
			toast.success("Propiedad eliminada correctamente");
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			setIsOpen(false);
			setLoading(false);
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
					<>{text && "Eliminar"}</>
				</Button>
			</DialogTrigger>
			<DialogContent>
				{loading ? (
					<DialogHeader>
						<div className="flex flex-col items-center gap-4">
							<div>Eliminando propiedad...</div>
							<Spinner size={30} />
						</div>
					</DialogHeader>
				) : (
					<>
						<DialogHeader>
							<DialogTitle>Eliminar propiedad</DialogTitle>
						</DialogHeader>
						<DialogDescription>
							¿Estás seguro que quieres eliminar esta propiedad? <br /> No podrás revertir la
							acción.
						</DialogDescription>
						<DialogFooter>
							<Button variant="secondary" onClick={handleCancel}>
								Cancelar
							</Button>
							<Button variant="destructive" onClick={handleDelete}>
								Eliminar
							</Button>
						</DialogFooter>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};
