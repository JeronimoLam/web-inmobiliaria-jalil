import { createClient } from "@/modules/admin/utils/supabase/client";

export type GetImagenFromPropiedadIdResponse = {
	id: number;
	propiedad_id: number;
	url: string;
	url_suffix: string | null;
	principal: boolean;
	created_at: Date;
}[];

export const getImagenesFromPropiedadId = async (
	propiedadId: number,
): Promise<GetImagenFromPropiedadIdResponse> => {
	const supabase = createClient();

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const jwt = session?.access_token;

	if (!jwt) {
		throw new Error("Unauthorized");
	}

	const { data, error } = await supabase.functions.invoke(
		`get_images_from_propiedad_id?id=${propiedadId.toString()}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		},
	);

	if (error || !data) throw new Error(error?.message || "Error al obtener las imágenes");
	console.log("data", data);
	return data.items;
};
