"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusIcon, MinusIcon } from "@/components/Icons";
import { useFiltersContext } from "@/modules/filters/context/FiltersContext";

interface CounterFilterProps {
	label: string;
	field: "dormitorios" | "banos" | "ambientesContador" | "pisos";
	className?: string;
}

export const CounterFilter = ({ label, field, className }: CounterFilterProps) => {
	const { filters, incrementCounter, decrementCounter } = useFiltersContext();

	return (
		<div className={`flex items-center justify-between ${className}`}>
			<Label className="text-sm font-semibold">{label}</Label>
			<div className="flex items-center gap-3">
				<Button
					variant="outline"
					size="sm"
					className="h-8 w-8 !p-0 rounded-full"
					onClick={() => decrementCounter(field)}
				>
					<MinusIcon width={12} height={12} />
				</Button>
				<span className="w-8 text-center text-sm font-medium">{filters[field]}</span>
				<Button
					variant="outline"
					size="sm"
					className="h-8 w-8 !p-0 rounded-full"
					onClick={() => incrementCounter(field)}
				>
					<PlusIcon width={12} height={12} />
				</Button>
			</div>
		</div>
	);
};
