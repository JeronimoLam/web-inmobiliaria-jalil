"use client";

import React, { useId, useState } from "react";
import { ChevronDownIcon, PhoneIcon } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export default function Component({ className }: { className: string }) {
	const id = useId();
	const [value, setValue] = useState("");

	return (
		<div className="*:not-first:mt-2" dir="ltr">
			<RPNInput.default
				className={`flex rounded-xl ${className}`}
				international
				flagComponent={FlagComponent}
				countrySelectComponent={CountrySelect}
				inputComponent={PhoneInput}
				id={id}
				placeholder="Teléfono"
				value={value}
				onChange={(newValue) => setValue(newValue ?? "")}
				defaultCountry="AR"
			/>
		</div>
	);
}

const PhoneInput = ({ className, ...props }: React.ComponentProps<"input">) => {
	return (
		<Input
			data-slot="phone-input"
			className={cn("-ms-px rounded-s-none shadow-none focus-visible:z-10", className)}
			{...props}
		/>
	);
};

PhoneInput.displayName = "PhoneInput";

type CountrySelectProps = {
	disabled?: boolean;
	value: RPNInput.Country;
	onChange: (value: RPNInput.Country) => void;
	options: { label: string; value: RPNInput.Country | undefined }[];
};

const CountrySelect = ({ disabled, value, onChange, options }: CountrySelectProps) => {
	const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value as RPNInput.Country);
	};

	return (
		<div className="border-input hover:bg-background focus-within:bg-background transition-colors duration-200 text-muted-foreground has-aria-invalid:border-destructive/60 relative inline-flex items-center self-stretch rounded-s-md border py-2 ps-3 pe-2 outline-none focus-within:z-10 has-disabled:pointer-events-none has-disabled:opacity-50">
			<div className="inline-flex items-center gap-1" aria-hidden="true">
				<FlagComponent country={value} countryName={value} aria-hidden="true" />
				<span className="text-muted-foreground/80">
					<ChevronDownIcon size={16} aria-hidden="true" />
				</span>
			</div>
			<select
				disabled={disabled}
				value={value}
				onChange={handleSelect}
				className="absolute inset-0 text-sm opacity-0 cursor-pointer"
				aria-label="Selecciona un país"
			>
				<option key="default" value="">
					Selecciona un país
				</option>
				{options
					.filter((x) => x.value)
					.map((option, i) => (
						<option key={option.value ?? `empty-${i}`} value={option.value}>
							{option.label} {option.value && `+${RPNInput.getCountryCallingCode(option.value)}`}
						</option>
					))}
			</select>
		</div>
	);
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
	const Flag = flags[country];

	return (
		<span className="w-5 overflow-hidden rounded-sm">
			{Flag ? <Flag title={countryName} /> : <PhoneIcon size={16} aria-hidden="true" />}
		</span>
	);
};
