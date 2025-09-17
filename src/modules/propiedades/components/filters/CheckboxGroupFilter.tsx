"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@/components/Icons";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useFiltersContext } from "@/modules/propiedades/context/FiltersContext";

interface CheckboxOption {
	id: string;
	label: string;
}

interface CheckboxGroupFilterProps {
	placeholder: string;
	options: CheckboxOption[];
	field: "caracteristicas" | "ambientes" | "servicios";
}

export const CheckboxGroupFilter = ({ placeholder, options, field }: CheckboxGroupFilterProps) => {
	const { filters, toggleCheckbox } = useFiltersContext();
	const [isOpen, setIsOpen] = useState(false);

	const selectedItems = filters[field] ?? [];

	return (
		<div className="space-y-3">
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<CollapsibleTrigger asChild>
					<Button
						variant="outline"
						className="w-full justify-between h-11 px-4 font-normal border-gray-200 hover:border-gray-300"
					>
						<span className="font-semibold">{placeholder}</span>
						<ChevronDownIcon
							className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
						/>
					</Button>
				</CollapsibleTrigger>
				<CollapsibleContent className="mt-3">
					<div className="bg-gray-50 rounded-lg p-4 space-y-3">
						{options.map((option) => (
							<div key={option.id} className="flex items-center space-x-3">
								<Checkbox
									id={option.id}
									checked={selectedItems.includes(option.id)}
									onCheckedChange={() => toggleCheckbox(option.id, field)}
								/>
								<label
									htmlFor={option.id}
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
								>
									{option.label}
								</label>
							</div>
						))}
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
};
