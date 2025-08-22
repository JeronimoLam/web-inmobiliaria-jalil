export type GetProperty = {
	code: string;
	images: string[];
	type: string;
	location: string;
	title: string;
	bedrooms: number;
	area: number;
	bathrooms: number;
	price?: number;
	expense?: number;
};

export type PropertyTypes =
	| "casa"
	| "departamento"
	| "terreno"
	| "local"
	| "construccion"
	| "cochera";
