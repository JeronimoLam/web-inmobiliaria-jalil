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
import { tiposPropiedad } from "@/modules/propiedades/data/filtros.data";
import { useFiltersContext } from "@/modules/propiedades/context/FiltersContext";

export const TipoPropiedadFilter = () => {
	const { filters, updateTipoPropiedad } = useFiltersContext();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="space-y-3">
			<Label className="block text-sm font-semibold">Tipo de propiedad</Label>
			<Popover open={isOpen} onOpenChange={setIsOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={isOpen}
						className="w-full justify-between h-11 px-4 font-normal border-gray-200 hover:border-gray-300"
					>
						{filters.tipoPropiedad
							? tiposPropiedad.find((tipo) => tipo.value === filters.tipoPropiedad)?.label
							: "Seleccionar tipo"}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent align="start" className="!p-0">
					<Command>
						<CommandInput placeholder="Buscar tipo..." />
						<CommandList>
							<CommandEmpty>No se encontró ningún tipo.</CommandEmpty>
							<CommandGroup>
								{tiposPropiedad.map((tipo) => (
									<CommandItem
										key={tipo.value}
										value={tipo.value}
										onSelect={(currentValue) => {
											updateTipoPropiedad(
												currentValue === filters.tipoPropiedad ? "" : currentValue,
											);
											setIsOpen(false);
										}}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												filters.tipoPropiedad === tipo.value ? "opacity-100" : "opacity-0",
											)}
										/>
										{tipo.label}
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
