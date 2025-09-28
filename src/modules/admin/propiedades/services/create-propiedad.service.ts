import { CreatePropiedad } from "../types/create-propiedad.type";

export const createPropiedad = async (newPropiedad: CreatePropiedad) => {
	console.log(newPropiedad);
	// const functionUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-propiedad`;

	// const response = await fetch(functionUrl, {
	// 	method: "POST",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 		apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	// 		Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
	// 	},
	// 	body: JSON.stringify(newPropiedad),
	// });

	// if (!response.ok) {
	// 	const errorData = await response.json();
	// 	throw new Error(errorData.message || "Error creating property");
	// }

	// return response.json();
};
