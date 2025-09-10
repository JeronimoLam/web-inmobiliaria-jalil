"use client";
import { ChevronDownIcon, FilterIcon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetBody,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDirection } from "@radix-ui/react-direction";
import { useState } from "react";
import { Plus, Minus, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const tiposPropiedad = [
	{ value: "casa", label: "Casa" },
	{ value: "departamento", label: "Departamento" },
	{ value: "oficina", label: "Oficina" },
	{ value: "local", label: "Local Comercial" },
	{ value: "terreno", label: "Terreno" },
	{ value: "quinta", label: "Quinta" },
];

const ubicaciones = [
	{ value: "palermo", label: "Palermo" },
	{ value: "belgrano", label: "Belgrano" },
	{ value: "recoleta", label: "Recoleta" },
	{ value: "puerto-madero", label: "Puerto Madero" },
	{ value: "san-telmo", label: "San Telmo" },
	{ value: "barracas", label: "Barracas" },
	{ value: "villa-crespo", label: "Villa Crespo" },
];

const caracteristicas = [
	{ id: "balcon", label: "Balcón" },
	{ id: "terraza", label: "Terraza" },
	{ id: "jardin", label: "Jardín" },
	{ id: "garage", label: "Garage" },
	{ id: "pileta", label: "Pileta" },
	{ id: "parrilla", label: "Parrilla" },
];

const ambientesOpciones = [
	{ id: "monoambiente", label: "Monoambiente" },
	{ id: "2-ambientes", label: "2 Ambientes" },
	{ id: "3-ambientes", label: "3 Ambientes" },
	{ id: "4-ambientes", label: "4 Ambientes" },
	{ id: "5-ambientes", label: "5+ Ambientes" },
];

const servicios = [
	{ id: "internet", label: "Internet" },
	{ id: "cable", label: "Cable TV" },
	{ id: "gas", label: "Gas Natural" },
	{ id: "agua", label: "Agua Corriente" },
	{ id: "seguridad", label: "Seguridad 24hs" },
	{ id: "portero", label: "Portero" },
];

export const FilterSideBar = () => {
	const direction = useDirection();
	const [open, setOpen] = useState(false);

	const [activeTab, setActiveTab] = useState<"venta" | "alquiler">("venta");

	const [tipoPropiedad, setTipoPropiedad] = useState("");
	const [ubicacion, setUbicacion] = useState("");
	const [dormitorios, setDormitorios] = useState(0);
	const [precio, setPrecio] = useState([0, 1000000]);
	const [caracteristicasSeleccionadas, setCaracteristicasSeleccionadas] = useState<string[]>([]);
	const [ambientesSeleccionados, setAmbientesSeleccionados] = useState<string[]>([]);
	const [serviciosSeleccionados, setServiciosSeleccionados] = useState<string[]>([]);
	const [superficieMin, setSuperficieMin] = useState("");
	const [superficieMax, setSuperficieMax] = useState("");
	const [baños, setBaños] = useState(0);
	const [ambientesContador, setAmbientesContador] = useState(0);
	const [niveles, setNiveles] = useState(0);

	const [openTipoPropiedad, setOpenTipoPropiedad] = useState(false);
	const [openUbicacion, setOpenUbicacion] = useState(false);
	const [openCaracteristicas, setOpenCaracteristicas] = useState(false);
	const [openAmbientes, setOpenAmbientes] = useState(false);
	const [openServicios, setOpenServicios] = useState(false);
	const [openOpcionesAvanzadas, setOpenOpcionesAvanzadas] = useState(false);

	const incrementCounter = (setter: React.Dispatch<React.SetStateAction<number>>) => {
		setter((prev) => prev + 1);
	};

	const decrementCounter = (setter: React.Dispatch<React.SetStateAction<number>>) => {
		setter((prev) => Math.max(0, prev - 1));
	};

	const toggleCheckbox = (
		value: string,
		selectedItems: string[],
		setter: (items: string[]) => void,
	) => {
		if (selectedItems.includes(value)) {
			setter(selectedItems.filter((item) => item !== value));
		} else {
			setter([...selectedItems, value]);
		}
	};

	const resetFilters = () => {
		setTipoPropiedad("");
		setUbicacion("");
		setDormitorios(0);
		setPrecio([0, 1000000]);
		setCaracteristicasSeleccionadas([]);
		setAmbientesSeleccionados([]);
		setServiciosSeleccionados([]);
		setSuperficieMin("");
		setSuperficieMax("");
		setBaños(0);
		setAmbientesContador(0);
		setNiveles(0);
	};

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="outline" className="w-full sm:w-auto py-selects font-semibold">
					<FilterIcon width={24} height={24} /> Filtros ({0})
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
						Filtros (0)
					</SheetTitle>
				</SheetHeader>

				{/* Content */}
				<SheetBody className="flex-1 overflow-y-auto pr-4">
					<div className="flex gap-3 mb-8">
						<Button
							onClick={() => setActiveTab("venta")}
							variant={activeTab === "venta" ? "default" : "outline"}
							className={cn(
								"flex-1 h-11 rounded-lg font-medium transition-all",
								activeTab === "venta" && "border border-primary shadow-sm",
							)}
						>
							Venta
						</Button>
						<Button
							onClick={() => setActiveTab("alquiler")}
							variant={activeTab === "alquiler" ? "default" : "outline"}
							className={cn(
								"flex-1 h-11 rounded-lg font-medium transition-all",
								activeTab === "alquiler" && "border border-primary shadow-sm",
							)}
						>
							Alquiler
						</Button>
					</div>

					{/* Filter Options */}
					<div className="space-y-6">
						<div className="space-y-3">
							<Label className="block text-sm font-semibold">Tipo de propiedad</Label>
							<Popover open={openTipoPropiedad} onOpenChange={setOpenTipoPropiedad}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										role="combobox"
										aria-expanded={openTipoPropiedad}
										className="w-full justify-between h-11 px-4 font-normal border-gray-200 hover:border-gray-300"
									>
										{tipoPropiedad
											? tiposPropiedad.find((tipo) => tipo.value === tipoPropiedad)?.label
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
															setTipoPropiedad(currentValue === tipoPropiedad ? "" : currentValue);
															setOpenTipoPropiedad(false);
														}}
													>
														<Check
															className={cn(
																"mr-2 h-4 w-4",
																tipoPropiedad === tipo.value ? "opacity-100" : "opacity-0",
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

						<div className="space-y-3">
							<Label className="block text-sm font-semibold">Ubicación</Label>
							<Popover open={openUbicacion} onOpenChange={setOpenUbicacion}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										role="combobox"
										aria-expanded={openUbicacion}
										className="w-full justify-between h-11 px-4 font-normal border-gray-200 hover:border-gray-300"
									>
										{ubicacion
											? ubicaciones.find((ub) => ub.value === ubicacion)?.label
											: "Seleccionar ubicación"}
										<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent align="start" className="!p-0">
									<Command>
										<CommandInput placeholder="Buscar ubicación..." />
										<CommandList>
											<CommandEmpty>No se encontró ninguna ubicación.</CommandEmpty>
											<CommandGroup>
												{ubicaciones.map((ub) => (
													<CommandItem
														key={ub.value}
														value={ub.value}
														onSelect={(currentValue) => {
															setUbicacion(currentValue === ubicacion ? "" : currentValue);
															setOpenUbicacion(false);
														}}
													>
														<Check
															className={cn(
																"mr-2 h-4 w-4",
																ubicacion === ub.value ? "opacity-100" : "opacity-0",
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

						<div className="space-y-3">
							<Label className="block text-sm font-semibold">Dormitorios</Label>
							<div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
								<span className="text-sm text-gray-600">Cantidad</span>
								<div className="flex items-center gap-3">
									<Button
										variant="outline"
										size="sm"
										className="h-8 w-8 !p-0 rounded-full"
										onClick={() => decrementCounter(setDormitorios)}
									>
										<Minus className="h-3 w-3" />
									</Button>
									<span className="w-8 text-center text-sm font-medium">{dormitorios}</span>
									<Button
										variant="outline"
										size="sm"
										className="h-8 w-8 !p-0 rounded-full"
										onClick={() => incrementCounter(setDormitorios)}
									>
										<Plus className="h-3 w-3" />
									</Button>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<Label className="block text-sm font-semibold">Rango de precio</Label>
							<div>
								<Slider
									value={precio}
									onValueChange={setPrecio}
									max={1000000}
									min={0}
									step={10000}
									className="w-full"
								/>
							</div>
							<div className="flex justify-between text-sm text-gray-500 px-2">
								<span>${precio[0].toLocaleString()}</span>
								<span>${precio[1].toLocaleString()}</span>
							</div>
						</div>

						<div className="space-y-3">
							<Collapsible open={openCaracteristicas} onOpenChange={setOpenCaracteristicas}>
								<CollapsibleTrigger asChild>
									<Button
										variant="outline"
										className="w-full justify-between h-11 px-4 font-normal border-gray-200 hover:border-gray-300"
									>
										<span className="font-semibold">Características</span>
										<ChevronDownIcon
											className={cn(
												"h-4 w-4 transition-transform",
												openCaracteristicas && "rotate-180",
											)}
										/>
									</Button>
								</CollapsibleTrigger>
								<CollapsibleContent className="mt-3">
									<div className="bg-gray-50 rounded-lg p-4 space-y-3">
										{caracteristicas.map((caracteristica) => (
											<div key={caracteristica.id} className="flex items-center space-x-3">
												<Checkbox
													id={caracteristica.id}
													checked={caracteristicasSeleccionadas.includes(caracteristica.id)}
													onCheckedChange={() =>
														toggleCheckbox(
															caracteristica.id,
															caracteristicasSeleccionadas,
															setCaracteristicasSeleccionadas,
														)
													}
												/>
												<label
													htmlFor={caracteristica.id}
													className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
												>
													{caracteristica.label}
												</label>
											</div>
										))}
									</div>
								</CollapsibleContent>
							</Collapsible>
						</div>

						<div className="space-y-3">
							<Collapsible open={openAmbientes} onOpenChange={setOpenAmbientes}>
								<CollapsibleTrigger asChild>
									<Button
										variant="outline"
										className="w-full justify-between h-11 px-4 font-normal border-gray-200 hover:border-gray-300"
									>
										<span className="font-semibold">Ambientes</span>
										<ChevronDownIcon
											className={cn("h-4 w-4 transition-transform", openAmbientes && "rotate-180")}
										/>
									</Button>
								</CollapsibleTrigger>
								<CollapsibleContent className="mt-3">
									<div className="bg-gray-50 rounded-lg p-4 space-y-3">
										{ambientesOpciones.map((ambiente) => (
											<div key={ambiente.id} className="flex items-center space-x-3">
												<Checkbox
													id={ambiente.id}
													checked={ambientesSeleccionados.includes(ambiente.id)}
													onCheckedChange={() =>
														toggleCheckbox(
															ambiente.id,
															ambientesSeleccionados,
															setAmbientesSeleccionados,
														)
													}
												/>
												<label
													htmlFor={ambiente.id}
													className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
												>
													{ambiente.label}
												</label>
											</div>
										))}
									</div>
								</CollapsibleContent>
							</Collapsible>
						</div>

						<div className="space-y-3">
							<Collapsible open={openServicios} onOpenChange={setOpenServicios}>
								<CollapsibleTrigger asChild>
									<Button
										variant="outline"
										className="w-full justify-between h-11 px-4 font-normal border-gray-200 hover:border-gray-300"
									>
										<span className="font-semibold">Servicios</span>
										<ChevronDownIcon
											className={cn("h-4 w-4 transition-transform", openServicios && "rotate-180")}
										/>
									</Button>
								</CollapsibleTrigger>
								<CollapsibleContent className="mt-3">
									<div className="bg-gray-50 rounded-lg p-4 space-y-3">
										{servicios.map((servicio) => (
											<div key={servicio.id} className="flex items-center space-x-3">
												<Checkbox
													id={servicio.id}
													checked={serviciosSeleccionados.includes(servicio.id)}
													onCheckedChange={() =>
														toggleCheckbox(
															servicio.id,
															serviciosSeleccionados,
															setServiciosSeleccionados,
														)
													}
												/>
												<label
													htmlFor={servicio.id}
													className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
												>
													{servicio.label}
												</label>
											</div>
										))}
									</div>
								</CollapsibleContent>
							</Collapsible>
						</div>

						<div className="space-y-3">
							<Collapsible open={openOpcionesAvanzadas} onOpenChange={setOpenOpcionesAvanzadas}>
								<CollapsibleTrigger asChild>
									<Button
										variant="outline"
										className="w-full justify-between h-11 px-4 font-normal border-gray-200 hover:border-gray-300"
									>
										<span className="font-semibold">Opciones avanzadas</span>
										<ChevronDownIcon
											className={cn(
												"h-4 w-4 transition-transform",
												openOpcionesAvanzadas && "rotate-180",
											)}
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
													value={superficieMin}
													onChange={(e) => setSuperficieMin(e.target.value)}
													className="flex-1 h-10"
												/>
												<span className="text-gray-400 text-sm">-</span>
												<Input
													type="number"
													placeholder="Máx m²"
													value={superficieMax}
													onChange={(e) => setSuperficieMax(e.target.value)}
													className="flex-1 h-10"
												/>
											</div>
										</div>

										<div className="flex items-center justify-between">
											<Label className="text-sm font-semibold">Baños</Label>
											<div className="flex items-center gap-3">
												<Button
													variant="outline"
													size="sm"
													className="h-8 w-8 !p-0 rounded-full"
													onClick={() => decrementCounter(setBaños)}
												>
													<Minus className="h-3 w-3" />
												</Button>
												<span className="w-8 text-center text-sm font-medium">{baños}</span>
												<Button
													variant="outline"
													size="sm"
													className="h-8 w-8 !p-0 rounded-full"
													onClick={() => incrementCounter(setBaños)}
												>
													<Plus className="h-3 w-3" />
												</Button>
											</div>
										</div>

										<div className="flex items-center justify-between">
											<Label className="text-sm font-semibold">Ambientes</Label>
											<div className="flex items-center gap-3">
												<Button
													variant="outline"
													size="sm"
													className="h-8 w-8 !p-0 rounded-full"
													onClick={() => decrementCounter(setAmbientesContador)}
												>
													<Minus className="h-3 w-3" />
												</Button>
												<span className="w-8 text-center text-sm font-medium">
													{ambientesContador}
												</span>
												<Button
													variant="outline"
													size="sm"
													className="h-8 w-8 !p-0 rounded-full"
													onClick={() => incrementCounter(setAmbientesContador)}
												>
													<Plus className="h-3 w-3" />
												</Button>
											</div>
										</div>

										<div className="flex items-center justify-between">
											<Label className="text-sm font-semibold">Niveles</Label>
											<div className="flex items-center gap-3">
												<Button
													variant="outline"
													size="sm"
													className="h-8 w-8 !p-0 rounded-full"
													onClick={() => decrementCounter(setNiveles)}
												>
													<Minus className="h-3 w-3" />
												</Button>
												<span className="w-8 text-center text-sm font-medium">{niveles}</span>
												<Button
													variant="outline"
													size="sm"
													className="h-8 w-8 !p-0 rounded-full"
													onClick={() => incrementCounter(setNiveles)}
												>
													<Plus className="h-3 w-3" />
												</Button>
											</div>
										</div>
									</div>
								</CollapsibleContent>
							</Collapsible>
						</div>
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
						<Button
							variant="default"
							className="flex-1 h-11 font-medium"
							onClick={() => setOpen(false)}
						>
							Aplicar Filtros
						</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
