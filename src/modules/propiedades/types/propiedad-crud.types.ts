import { Propiedad } from "./propiedad.type";

// Tipos para los CRUD de propiedades
export type CrearPropiedadDTO = Omit<Propiedad, "id">;

export type ActualizarPropiedadDTO = Partial<CrearPropiedadDTO>;
