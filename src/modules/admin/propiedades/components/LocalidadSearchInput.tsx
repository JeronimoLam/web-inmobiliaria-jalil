"use client";

import { useState, useEffect } from "react";
import { CheckIcon, ChevronDownIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface Localidad {
	id: number;
	nombre: string;
}

interface LocalidadSearchInputProps {
	localidades: Localidad[];
	value: string;
	onChange: (value: string) => void;
	label?: string;
	placeholder?: string;
	className?: string;
	error?: string;
}

export const LocalidadSearchInput = ({
	localidades,
	value,
	onChange,
	label = "Localidad",
	placeholder = "Buscar o escribir localidad...",
	className,
	error,
}: LocalidadSearchInputProps) => {
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState(value);

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	const handleSelect = (selectedValue: string) => {
		setInputValue(selectedValue);
		onChange(selectedValue);
		setOpen(false);
	};

	const handleInputChange = (newValue: string) => {
		setInputValue(newValue);
		onChange(newValue);
	};

	const filteredLocalidades = localidades.filter((localidad) =>
		localidad.nombre.toLowerCase().includes(inputValue.toLowerCase()),
	);

	const selectedLocalidad = localidades.find((l) => l.nombre === value);

	return (
		<div className={cn("space-y-2 w-full", className)}>
			{label && (
				<Label>
					{label} <span className="text-red-500">*</span>
				</Label>
			)}
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full h-full justify-between font-normal border-input"
					>
						<span className={cn("truncate", !value && "text-muted-foreground")}>
							{value || placeholder}
						</span>
						<ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0" align="start">
					<Command>
						<CommandInput
							placeholder={placeholder}
							value={inputValue}
							onValueChange={handleInputChange}
						/>
						<CommandList>
							{inputValue && !selectedLocalidad && (
								<CommandItem onSelect={() => handleSelect(inputValue)} className="text-blue-600">
									<PlusIcon className="mr-2 h-4 w-4" />
									Crear &quot;{inputValue}&quot;
								</CommandItem>
							)}
							<CommandEmpty>
								{inputValue ? (
									<div className="py-2">
										<p className="text-sm text-muted-foreground">
											No se encontró &quot;{inputValue}&quot;
										</p>
										<Button
											variant="ghost"
											size="sm"
											className="mt-2"
											onClick={() => handleSelect(inputValue)}
										>
											<PlusIcon className="mr-2 h-4 w-4" />
											Crear nueva localidad
										</Button>
									</div>
								) : (
									"No hay localidades disponibles"
								)}
							</CommandEmpty>
							<CommandGroup>
								{filteredLocalidades.map((localidad) => (
									<CommandItem
										key={localidad.id}
										value={localidad.nombre}
										onSelect={() => handleSelect(localidad.nombre)}
									>
										{localidad.nombre}
										{value === localidad.nombre && <CheckIcon className="ml-auto h-4 w-4" />}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{error && <p className="text-sm text-destructive">{error}</p>}
		</div>
	);
};
