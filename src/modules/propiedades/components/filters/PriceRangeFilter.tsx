"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useFiltersContext } from "@/modules/filters/context/FiltersContext";
import { LIMITS } from "@/modules/filters/constants/filters.constants";

export const PriceRangeFilter = () => {
	const { filters, updatePrecio } = useFiltersContext();

	const currentMin = filters.precioMin ?? LIMITS.MIN_PRECIO;
	const currentMax = filters.precioMax ?? LIMITS.MAX_PRECIO;

	return (
		<div className="space-y-4">
			<Label className="block text-sm font-semibold">Rango de precio</Label>
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
