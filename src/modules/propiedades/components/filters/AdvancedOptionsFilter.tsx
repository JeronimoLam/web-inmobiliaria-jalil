"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "@/components/Icons";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useFiltersContext } from "@/modules/propiedades/context/FiltersContext";
import { CounterFilter } from "@/modules/propiedades/components/filters/CounterFilter";

export const AdvancedOptionsFilter = () => {
	const { filters, updateSuperficie } = useFiltersContext();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="space-y-3">
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<CollapsibleTrigger asChild>
					<Button
						variant="outline"
						className="w-full justify-between h-11 px-4 font-normal border-gray-200 hover:border-gray-300"
					>
						<span className="font-semibold">Opciones avanzadas</span>
						<ChevronDownIcon
							className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
						/>
					</Button>
				</CollapsibleTrigger>
				<CollapsibleContent className="mt-3">
					<div className="bg-gray-50 rounded-lg p-4 space-y-5">
						<div>
							<Label className="text-sm font-semibold mb-2 block">Superficie Terreno</Label>
							<div className="flex gap-3 items-center">
								<Input
									type="number"
									placeholder="Mín m²"
									value={filters.superficieMin}
									onChange={(e) => updateSuperficie("superficieMin", e.target.value)}
									className="flex-1 h-10"
								/>
								<span className="text-gray-400 text-sm">-</span>
								<Input
									type="number"
									placeholder="Máx m²"
									value={filters.superficieMax}
									onChange={(e) => updateSuperficie("superficieMax", e.target.value)}
									className="flex-1 h-10"
								/>
							</div>
						</div>

						<CounterFilter label="Baños" field="banos" />
						<CounterFilter label="Ambientes" field="ambientesContador" />
						<CounterFilter label="Pisos" field="pisos" />
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
};
