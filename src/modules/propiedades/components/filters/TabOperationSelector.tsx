"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";

export const TabOperationSelector = () => {
	const path = usePathname();
	const router = useRouter();

	let currentOperation: OperacionesEnum;

	if (path.includes("/venta")) {
		currentOperation = OperacionesEnum.VENTA;
	} else if (path.includes("/alquiler")) {
		currentOperation = OperacionesEnum.ALQUILER;
	} else {
		currentOperation = OperacionesEnum.VENTA; // Default
	}

	const handleOperacionChange = (operacion: OperacionesEnum) => {
		const currentParams = new URLSearchParams(window.location.search);

		const newPath =
			operacion === OperacionesEnum.VENTA ? "/propiedades/venta" : "/propiedades/alquiler";
		const newUrl = currentParams.toString() ? `${newPath}?${currentParams.toString()}` : newPath;

		router.replace(newUrl, { scroll: false });
	};

	return (
		<div className="flex gap-3 mb-8">
			<Button
				onClick={() => handleOperacionChange(OperacionesEnum.VENTA)}
				variant={currentOperation === OperacionesEnum.VENTA ? "default" : "outline"}
				className={cn(
					"flex-1 h-11 rounded-lg font-medium transition-all",
					currentOperation === OperacionesEnum.VENTA && "border border-primary shadow-sm",
				)}
			>
				Venta
			</Button>
			<Button
				onClick={() => handleOperacionChange(OperacionesEnum.ALQUILER)}
				variant={currentOperation === OperacionesEnum.ALQUILER ? "default" : "outline"}
				className={cn(
					"flex-1 h-11 rounded-lg font-medium transition-all",
					currentOperation === OperacionesEnum.ALQUILER && "border border-primary shadow-sm",
				)}
			>
				Alquiler
			</Button>
		</div>
	);
};
