import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CreatePropiedad } from "@/modules/admin/propiedades/types/create-propiedad.types";

export const TabDetalles = () => {
	const { register, control } = useFormContext<CreatePropiedad>();
	return (
		<div className="space-y-6">
			<Card className="py-6">
				<CardHeader>
					<CardTitle>Detalles Básicos</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<Label htmlFor="ambientes">Ambientes</Label>
							<Input
								id="ambientes"
								type="number"
								{...register("detalles.ambientes", { valueAsNumber: true })}
								placeholder="0"
							/>
						</div>
						<div>
							<Label htmlFor="dormitorios">Dormitorios</Label>
							<Input
								id="dormitorios"
								type="number"
								{...register("detalles.dormitorios", { valueAsNumber: true })}
								placeholder="0"
							/>
						</div>
						<div>
							<Label htmlFor="banos">Baños</Label>
							<Input
								id="banos"
								type="number"
								{...register("detalles.banos", { valueAsNumber: true })}
								placeholder="0"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<Label htmlFor="superficie_lote">Superficie del lote (m²)</Label>
							<Input
								id="superficie_lote"
								type="number"
								step="0.1"
								{...register("detalles.superficie_lote", { valueAsNumber: true })}
								placeholder="0"
							/>
						</div>
						<div>
							<Label htmlFor="superficie_cubierta">Superficie cubierta (m²)</Label>
							<Input
								id="superficie_cubierta"
								type="number"
								step="0.1"
								{...register("detalles.superficie_cubierta", { valueAsNumber: true })}
								placeholder="0"
							/>
						</div>
						<div>
							<Label htmlFor="antiguedad">Antigüedad</Label>
							<Input
								id="antiguedad"
								{...register("detalles.antiguedad")}
								placeholder="Ej: 5 años"
							/>
						</div>
					</div>

					<div>
						<Label htmlFor="garage">Garage</Label>
						<Input
							id="garage"
							{...register("detalles.garage")}
							placeholder="Ej: Cubierto, Descubierto"
						/>
					</div>
				</CardContent>
			</Card>

			<Card className="py-6">
				<CardHeader>
					<CardTitle>Características</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						{Object.entries({
							agua_caliente_central: "Agua caliente central",
							aire_acondicionado_individual: "Aire acondicionado individual",
							alarma: "Alarma",
							amoblado: "Amoblado",
							calefaccion_individual: "Calefacción individual",
							apto_credito: "Apto crédito",
							apto_mascotas: "Apto mascotas",
							apto_profesional: "Apto profesional",
							calefaccion: "Calefacción",
							calefaccion_central: "Calefacción central",
							luminoso: "Luminoso",
							seguridad: "Seguridad",
							pileta: "Pileta",
							parrilla: "Parrilla",
							quincho: "Quincho",
							hidromasaje: "Hidromasaje",
							gimnasio: "Gimnasio",
							sauna: "Sauna",
							deck: "Deck",
							riego_automatico: "Riego automático",
						}).map(([key, label]) => (
							<div key={key} className="flex items-center space-x-2">
								<Controller
									name={`caracteristicas.${key as keyof CreatePropiedad["caracteristicas"]}`}
									control={control}
									render={({ field }) => (
										<Checkbox id={key} checked={field.value} onCheckedChange={field.onChange} />
									)}
								/>
								<Label htmlFor={key} className="text-sm">
									{label}
								</Label>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<Card className="py-6">
				<CardHeader>
					<CardTitle>Ambientes</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						{Object.entries({
							cocina: "Cocina",
							comedor: "Comedor",
							living: "Living",
							hall: "Hall",
							lavadero: "Lavadero",
							toilette: "Toilette",
							balcon: "Balcón",
							terraza: "Terraza",
							jardin: "Jardín",
							patio: "Patio",
							baulera: "Baulera",
							altillo: "Altillo",
							sotano: "Sótano",
							suite: "Suite",
							vestidor: "Vestidor",
							oficina: "Oficina",
							escritorio: "Escritorio",
							biblioteca: "Biblioteca",
							galeria: "Galería",
							dependencia: "Dependencia",
							comedor_diario: "Comedor diario",
							living_comedor: "Living comedor",
						}).map(([key, label]) => (
							<div key={key} className="flex items-center space-x-2">
								<Controller
									name={`ambientes.${key as keyof CreatePropiedad["ambientes"]}`}
									control={control}
									render={({ field }) => (
										<Checkbox id={key} checked={field.value} onCheckedChange={field.onChange} />
									)}
								/>
								<Label htmlFor={key} className="text-sm">
									{label}
								</Label>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<Card className="py-6">
				<CardHeader>
					<CardTitle>Servicios</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						{Object.entries({
							agua_corriente: "Agua corriente",
							cloaca: "Cloaca",
							electricidad: "Electricidad",
							gas_natural: "Gas natural",
							internet: "Internet",
							pavimento: "Pavimento",
							telefono: "Teléfono",
							videocable: "Videocable",
						}).map(([key, label]) => (
							<div key={key} className="flex items-center space-x-2">
								<Controller
									name={`servicios.${key as keyof CreatePropiedad["servicios"]}`}
									control={control}
									render={({ field }) => (
										<Checkbox id={key} checked={field.value} onCheckedChange={field.onChange} />
									)}
								/>
								<Label htmlFor={key} className="text-sm">
									{label}
								</Label>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
