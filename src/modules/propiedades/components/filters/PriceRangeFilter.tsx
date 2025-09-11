"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useFiltersContext } from "@/modules/propiedades/context/FiltersContext";

export const PriceRangeFilter = () => {
	const { filters, updatePrecio } = useFiltersContext();

	return (
		<div className="space-y-4">
			<Label className="block text-sm font-semibold">Rango de precio</Label>
			<div>
				<Slider
					value={filters.precio}
					onValueChange={(value) => updatePrecio([value[0], value[1]])}
					max={1000000}
					min={0}
					step={10000}
					className="w-full"
				/>
			</div>
			<div className="flex justify-between text-sm text-gray-500 px-2">
				<span>${filters.precio[0].toLocaleString()}</span>
				<span>${filters.precio[1].toLocaleString()}</span>
			</div>
		</div>
	);
};
