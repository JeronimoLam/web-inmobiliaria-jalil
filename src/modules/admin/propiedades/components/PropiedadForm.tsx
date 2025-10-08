"use client";

import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabPropiedad } from "@/modules/admin/propiedades/components/tabs/TabPropiedad";
import { TabDetalles } from "@/modules/admin/propiedades/components/tabs/TabDetalles";
import { TabImagenes } from "@/modules/admin/propiedades/components/tabs/TabImagenes";
import { useGetInitDataForm } from "@/modules/admin/propiedades/hooks/getInitDataForm";
import { useImages } from "@/modules/admin/propiedades/hooks/useImages";
import { AdminLoader } from "@/modules/admin/components/AdminLoader";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { usePropiedadForm } from "@/modules/admin/propiedades/hooks/usePropiedadForm";
import { useSubmitPropiedadForm } from "@/modules/admin/propiedades/hooks/useSubmitPropiedadForm";

interface PropiedadFormProps {
	context: "create" | "edit";
	propiedad?: Propiedad;
}

export const PropiedadForm = ({ context, propiedad }: PropiedadFormProps) => {
	const router = useRouter();
	const { tiposPropiedad, localidades } = useGetInitDataForm();
	const { formMethods, handleSubmit } = usePropiedadForm({ context, propiedad });
	const { images, handleImagesChange } = useImages({ propiedad });
	const { loading, uploadingImages, onSubmit } = useSubmitPropiedadForm({
		context,
		propiedad,
		images,
	});

	const handleCancel = () => {
		router.push("/admin/propiedades");
	};

	if (context === "edit" && !propiedad) {
		return <AdminLoader text="Cargando propiedad..." />;
	}

	if (loading || uploadingImages) {
		return (
			<AdminLoader text={`${context === "create" ? "Creando" : "Actualizando"} propiedad...`} />
		);
	}

	return (
		<div className="px-4 py-6 sm:p-6 flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<Button variant="ghost" size="sm" onClick={() => router.back()}>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Volver
				</Button>
			</div>
			<FormProvider {...formMethods}>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<Tabs defaultValue="propiedad" className="w-full">
						<TabsList className="grid w-full grid-cols-3 bg-secondary">
							<TabsTrigger value="propiedad">Propiedad</TabsTrigger>
							<TabsTrigger value="detalles">Detalles</TabsTrigger>
							<TabsTrigger value="imagenes">Imágenes</TabsTrigger>
						</TabsList>

						<TabsContent value="propiedad">
							<TabPropiedad tiposPropiedad={tiposPropiedad} localidades={localidades} />
						</TabsContent>

						<TabsContent value="detalles">
							<TabDetalles />
						</TabsContent>

						<TabsContent value="imagenes">
							<TabImagenes images={images} onImagesChange={handleImagesChange} />
						</TabsContent>
					</Tabs>

					<div className="flex justify-end space-x-4 pt-6">
						<Button type="button" variant="outline" onClick={handleCancel}>
							Cancelar
						</Button>
						<Button type="submit" disabled={loading || uploadingImages}>
							{loading || uploadingImages
								? "Procesando..."
								: `${context === "create" ? "Crear" : "Actualizar"} Propiedad`}
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};
