import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { CreatePropiedad } from "../types/create-propiedad.types";
import {
	Select,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";

export const ExpensasForm = () => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
		trigger,
	} = useFormContext<CreatePropiedad>();

	const hasExpensas = watch("propiedad.has_expensas");

	useEffect(() => {
		register("propiedad.expensas_divisa", {
			required: hasExpensas ? "La divisa es obligatoria" : false,
		});
	}, [register, hasExpensas]);

	const handleExpensasChange = (checked: boolean) => {
		setValue("propiedad.has_expensas", checked, { shouldValidate: true });

		if (!checked) {
			setValue("propiedad.expensas_value", undefined, { shouldValidate: true });
			setValue("propiedad.expensas_divisa", undefined, { shouldValidate: true });
		} else {
			trigger(["propiedad.expensas_value", "propiedad.expensas_divisa"]);
		}
	};

	return (
		<Card className="py-6">
			<CardHeader>
				<div className="flex items-center gap-2">
					<CardTitle>Expensas</CardTitle>
					<div className="flex items-center space-x-2">
						<Checkbox
							id="has_expensas"
							checked={hasExpensas}
							onCheckedChange={handleExpensasChange}
							className="border-secondary"
						/>
					</div>
				</div>
			</CardHeader>
			<CardContent className="mt-3">
				{hasExpensas && (
					<div className="flex gap-4">
						<div className="flex-1">
							<Label htmlFor="expensas_divisa">
								Divisa <span className="text-red-500">*</span>
							</Label>
							<Select
								onValueChange={(value) =>
									setValue("propiedad.expensas_divisa", value, { shouldValidate: true })
								}
								value={watch("propiedad.expensas_divisa")}
							>
								<SelectTrigger>
									<SelectValue placeholder="ARS o USD" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="ARS">ARS</SelectItem>
									<SelectItem value="USD">USD</SelectItem>
								</SelectContent>
							</Select>
							{errors.propiedad?.expensas_divisa && (
								<p className="text-sm text-red-500 mt-2">
									{errors.propiedad.expensas_divisa.message}
								</p>
							)}
						</div>
						<div className="flex-1">
							<Label htmlFor="expensas_value">
								Importe <span className="text-red-500">*</span>
							</Label>
							<Input
								type="number"
								placeholder="ej: 10000"
								{...register("propiedad.expensas_value", {
									required: hasExpensas ? "El importe es obligatorio" : false,
								})}
							/>
							{errors.propiedad?.expensas_value && (
								<p className="text-sm text-red-500 mt-2">
									{errors.propiedad.expensas_value.message}
								</p>
							)}
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
