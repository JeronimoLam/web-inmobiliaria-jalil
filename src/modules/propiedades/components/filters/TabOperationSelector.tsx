"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFiltersContext } from "../../context/FiltersContext";

export const TabOperationSelector = () => {
	const { filters, updateOperacion } = useFiltersContext();

	return (
		<div className="flex gap-3 mb-8">
			<Button
				onClick={() => updateOperacion("venta")}
				variant={filters.operacion === "venta" ? "default" : "outline"}
				className={cn(
					"flex-1 h-11 rounded-lg font-medium transition-all",
					filters.operacion === "venta" && "border border-primary shadow-sm",
				)}
			>
				Venta
			</Button>
			<Button
				onClick={() => updateOperacion("alquiler")}
				variant={filters.operacion === "alquiler" ? "default" : "outline"}
				className={cn(
					"flex-1 h-11 rounded-lg font-medium transition-all",
					filters.operacion === "alquiler" && "border border-primary shadow-sm",
				)}
			>
				Alquiler
			</Button>
		</div>
	);
};
