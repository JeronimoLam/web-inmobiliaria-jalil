"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFiltersContext } from "@/modules/filters/context/FiltersContext";
import { FilterOption } from "@/modules/filters/types/filters.type";

interface LocalidadFilterProps {
	options: FilterOption[];
}

export const LocalidadFilter = ({ options }: LocalidadFilterProps) => {
	const { filters, updateLocalidad } = useFiltersContext();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="space-y-3">
			<Label className="block text-sm font-semibold">Localidad</Label>
			<Popover open={isOpen} onOpenChange={setIsOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={isOpen}
						className="w-full justify-between h-11 px-4 font-normal border-gray-200 hover:border-gray-300"
					>
						{filters.localidad
							? options.find((ub) => ub.value === filters.localidad)?.label
							: "Seleccionar localidad"}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent align="start" className="!p-0">
					<Command>
						<CommandInput placeholder="Buscar ubicación..." />
						<CommandList>
							<CommandEmpty>No se encontró ninguna ubicación.</CommandEmpty>
							<CommandGroup>
								{options.map((ub) => (
									<CommandItem
										key={ub.value}
										value={ub.value}
										onSelect={(currentValue) => {
											updateLocalidad(currentValue === filters.localidad ? "" : currentValue);
											setIsOpen(false);
										}}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												filters.localidad === ub.value ? "opacity-100" : "opacity-0",
											)}
										/>
										{ub.label}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
};
