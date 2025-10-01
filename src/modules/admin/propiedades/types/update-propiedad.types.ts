import { CreatePropiedad } from "./create-propiedad.types";

export interface UpdatePropiedad extends Partial<CreatePropiedad> {
	id: number;
}
