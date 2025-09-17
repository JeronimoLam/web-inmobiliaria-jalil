"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFiltersContext } from "../../context/FiltersContext";
import { OperacionesEnum } from "../../enums/propiedades.enum";

export const TabOperationSelector = () => {
	const { operacion, updateOperacion } = useFiltersContext();

	return (
		<div className="flex gap-3 mb-8">
			<Button
				onClick={() => updateOperacion(OperacionesEnum.VENTA)}
				variant={operacion === OperacionesEnum.VENTA ? "default" : "outline"}
				className={cn(
					"flex-1 h-11 rounded-lg font-medium transition-all",
					operacion === OperacionesEnum.VENTA && "border border-primary shadow-sm",
				)}
			>
				Venta
			</Button>
			<Button
				onClick={() => updateOperacion(OperacionesEnum.ALQUILER)}
				variant={operacion === OperacionesEnum.ALQUILER ? "default" : "outline"}
				className={cn(
					"flex-1 h-11 rounded-lg font-medium transition-all",
					operacion === OperacionesEnum.ALQUILER && "border border-primary shadow-sm",
				)}
			>
				Alquiler
			</Button>
		</div>
	);
};
