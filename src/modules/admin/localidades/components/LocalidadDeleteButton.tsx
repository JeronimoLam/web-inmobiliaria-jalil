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
import { useState, useTransition } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { deleteLocalidad } from "@/modules/admin/localidades/actions/delete-localidad.action";
import { toast } from "sonner";

interface DeleteLocalidadProps {
	id: number;
	text?: boolean;
}

export const LocalidadDeleteButton = ({ id, text = false }: DeleteLocalidadProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();

	const action = async (formData: FormData) => {
		startTransition(async () => {
			await deleteLocalidad(formData)
				.then(() => {
					setIsOpen(false);
					toast.success("Localidad eliminada correctamente");
				})
				.catch(() => {
					toast.error("Error al eliminar la localidad");
				});
		});
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
				{isPending ? (
					<DialogHeader>
						<div className="flex flex-col items-center gap-4">
							<div>Eliminando localidad...</div>
							<Spinner size={30} />
						</div>
					</DialogHeader>
				) : (
					<>
						<DialogHeader>
							<DialogTitle>Eliminar localidad</DialogTitle>
						</DialogHeader>
						<DialogDescription>
							¿Estás seguro que quieres eliminar esta localidad? <br /> No podrás revertir la
							acción.
						</DialogDescription>
						<DialogFooter>
							<Button variant="secondary" onClick={handleCancel}>
								Cancelar
							</Button>
							<form action={action}>
								<input type="hidden" name="id" value={id} />
								<Button variant="destructive" type="submit">
									Eliminar
								</Button>
							</form>
						</DialogFooter>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};
