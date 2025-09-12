"use client";

import { FilterIcon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetBody,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useDirection } from "@radix-ui/react-direction";
import { useFiltersContext } from "../context/FiltersContext";
import { TabOperationSelector } from "./filters/TabOperationSelector";
import { TipoPropiedadFilter } from "./filters/TipoPropiedadFilter";
import { UbicacionFilter } from "./filters/UbicacionFilter";
import { CounterFilter } from "./filters/CounterFilter";
import { PriceRangeFilter } from "./filters/PriceRangeFilter";
import { CheckboxGroupFilter } from "./filters/CheckboxGroupFilter";
import { AdvancedOptionsFilter } from "./filters/AdvancedOptionsFilter";
import {
	caracteristicas,
	ambientesOpciones,
	servicios,
} from "@/modules/propiedades/data/filtros.data";
import { useState } from "react";

export const FilterSideBar = () => {
	const direction = useDirection();
	const [sheetOpen, setSheetOpen] = useState(false);
	const { resetFilters, handleFilters, getActiveFiltersCount } = useFiltersContext();

	const applyFilters = () => {
		handleFilters();
		setSheetOpen(false);
	};

	return (
		<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
			<SheetTrigger asChild>
				<Button variant="outline" className="w-full sm:w-auto py-selects font-semibold">
					<FilterIcon width={24} height={24} /> Filtros ({getActiveFiltersCount()})
				</Button>
			</SheetTrigger>

			<SheetContent
				dir={direction}
				side="left"
				className="w-full sm:w-[500px] 2xl:w-[600px] !max-w-none flex flex-col p-4"
			>
				<SheetHeader className="flex flex-row items-center justify-between pb-4 border-b space-y-0">
					<SheetTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
						<FilterIcon className="h-5 w-5" />
						Filtros ({getActiveFiltersCount()})
					</SheetTitle>
					<SheetDescription className="sr-only">
						Filtros para consulta y selección de propiedades inmobiliarias
					</SheetDescription>
				</SheetHeader>

				<SheetBody className="flex-1 overflow-y-auto pr-4">
					<TabOperationSelector />

					{/* Filter Components */}
					<div className="space-y-6">
						<TipoPropiedadFilter />
						<UbicacionFilter />
						<div className="space-y-3">
							<CounterFilter
								label="Dormitorios"
								field="dormitorios"
								className="bg-gray-50 rounded-lg p-3"
							/>
						</div>
						<PriceRangeFilter />
						<CheckboxGroupFilter
							placeholder="Características"
							options={caracteristicas}
							field="caracteristicas"
						/>
						<CheckboxGroupFilter
							placeholder="Ambientes"
							options={ambientesOpciones}
							field="ambientes"
						/>
						<CheckboxGroupFilter placeholder="Servicios" options={servicios} field="servicios" />
						<AdvancedOptionsFilter />
					</div>
				</SheetBody>

				<SheetFooter className="mt-auto pt-4 border-t">
					<div className="flex gap-3 w-full">
						<Button
							variant="outline"
							className="flex-1 h-11 border-gray-300 hover:bg-gray-50 bg-transparent font-medium"
							onClick={resetFilters}
						>
							Borrar Filtros
						</Button>
						<Button variant="secondary" className="flex-1 h-11 font-medium" onClick={applyFilters}>
							Aplicar Filtros
						</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
