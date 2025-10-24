"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useFiltersContext } from "@/modules/filters/context/FiltersContext";
import { getMaxPrecio, LIMITS } from "@/modules/filters/constants/filters.constants";
import { Badge } from "@/components/ui/badge";
import { OperacionesEnum } from "../../enums/propiedades.enum";

export const PriceRangeFilter = () => {
	const { filters, updatePrecio, updateDivisa, operacion } = useFiltersContext();

	const divisa = filters.divisa || (operacion === OperacionesEnum.ALQUILER ? "ARS" : "USD");
	const MAX_PRECIO = getMaxPrecio(divisa, operacion);
	const currentMin = filters.precioMin ?? LIMITS.MIN_PRECIO;
	const currentMax = filters.precioMax ?? MAX_PRECIO;

	const isARS = divisa === "ARS" && operacion === OperacionesEnum.ALQUILER;
	const isUSD =
		divisa === "USD" &&
		(operacion === OperacionesEnum.VENTA || operacion === OperacionesEnum.ALQUILER);

	const handleDivisaChange = (divisa: "ARS" | "USD") => {
		updateDivisa(divisa);
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<Label className="block text-sm font-semibold">Rango de precio</Label>
				<div className="flex gap-2">
					{operacion === OperacionesEnum.ALQUILER && (
						<div
							className="flex items-center cursor-pointer"
							onClick={() => handleDivisaChange("ARS")}
						>
							<Badge className="text-xs" variant={isARS ? "default" : "outline"}>
								ARS
							</Badge>
						</div>
					)}
					<div
						className="flex items-center cursor-pointer"
						onClick={() => handleDivisaChange("USD")}
					>
						<Badge className="text-xs" variant={isUSD ? "default" : "outline"}>
							USD
						</Badge>
					</div>
				</div>
			</div>
			<div>
				<Slider
					value={[currentMin, currentMax]}
					onValueChange={(value) => updatePrecio(value[0], value[1])}
					max={MAX_PRECIO}
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
