"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useFiltersContext } from "@/modules/filters/context/FiltersContext";
import { LIMITS } from "@/modules/filters/constants/filters.constants";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const PriceRangeFilter = () => {
	const { filters, updatePrecio, updateDivisa } = useFiltersContext();

	const pathname = usePathname();
	const isAlquilerPath = pathname.includes("/propiedades/alquiler");
	const isVentaPath = pathname.includes("/propiedades/venta");

	const currentMin = filters.precioMin ?? LIMITS.MIN_PRECIO;
	const currentMax = filters.precioMax ?? LIMITS.MAX_PRECIO;

	const isAlquiler = filters.divisa === "ARS";
	const isVenta = filters.divisa === "USD";

	useEffect(() => {
		if (isAlquilerPath) {
			updateDivisa("ARS");
		}
		if (isVentaPath) {
			updateDivisa("USD");
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAlquilerPath, isVentaPath]);

	const handleDivisaChange = (divisa: "ARS" | "USD") => {
		updateDivisa(divisa);
	};

	console.log(filters.divisa);

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<Label className="block text-sm font-semibold">Rango de precio</Label>
				<div className="flex gap-2">
					{isAlquilerPath && (
						<div
							className="flex items-center cursor-pointer"
							onClick={() => handleDivisaChange("ARS")}
						>
							<Badge className="text-xs" variant={isAlquiler ? "default" : "outline"}>
								ARS
							</Badge>
						</div>
					)}
					<div
						className="flex items-center cursor-pointer"
						onClick={() => handleDivisaChange("USD")}
					>
						<Badge className="text-xs" variant={isVenta ? "default" : "outline"}>
							USD
						</Badge>
					</div>
				</div>
			</div>
			<div>
				<Slider
					value={[currentMin, currentMax]}
					onValueChange={(value) => updatePrecio(value[0], value[1])}
					max={LIMITS.MAX_PRECIO}
					min={LIMITS.MIN_PRECIO}
					step={10000}
					className="w-full"
				/>
			</div>
			<div className="flex justify-between text-sm text-gray-500 px-2">
				<span>${currentMin.toLocaleString()}</span>
				<span>${currentMax.toLocaleString()}</span>
			</div>
		</div>
	);
};
