import { CreatePropiedad } from "../types/create-propiedad.types";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { transformPropiedadToFormData } from "./transformPropiedadToFormData";

export const getChangedFields = (originalPropiedad: Propiedad, modifiedData: CreatePropiedad) => {
	const originalData = transformPropiedadToFormData(originalPropiedad);
	const changes: Record<string, unknown> = {};

	// Comparar propiedad
	const propiedadChanges: Record<string, unknown> = {};
	if (modifiedData.propiedad.calle !== originalData.propiedad.calle) {
		propiedadChanges.calle = modifiedData.propiedad.calle;
	}
	if (modifiedData.propiedad.entre_calles !== originalData.propiedad.entre_calles) {
		propiedadChanges.entre_calles = modifiedData.propiedad.entre_calles;
	}
	if (modifiedData.propiedad.numero !== originalData.propiedad.numero) {
		propiedadChanges.numero = modifiedData.propiedad.numero;
	}
	if (modifiedData.propiedad.descripcion !== originalData.propiedad.descripcion) {
		propiedadChanges.descripcion = modifiedData.propiedad.descripcion;
	}
	if (modifiedData.propiedad.tipo_propiedad !== originalData.propiedad.tipo_propiedad) {
		propiedadChanges.tipo_propiedad = modifiedData.propiedad.tipo_propiedad;
	}
	if (modifiedData.propiedad.destacada !== originalData.propiedad.destacada) {
		propiedadChanges.destacada = modifiedData.propiedad.destacada;
	}
	if (
		JSON.stringify(modifiedData.propiedad.map_location) !==
		JSON.stringify(originalData.propiedad.map_location)
	) {
		propiedadChanges.map_location = modifiedData.propiedad.map_location;
	}

	if (Object.keys(propiedadChanges).length > 0) {
		changes.propiedad = propiedadChanges;
	}

	// Comparar localidad
	if (modifiedData.localidad_name !== originalData.localidad_name) {
		changes.localidad_name = modifiedData.localidad_name;
	}

	// Comparar ambientes
	const ambientesChanges: Record<string, boolean> = {};
	Object.keys(modifiedData.ambientes).forEach((key) => {
		if (
			modifiedData.ambientes[key as keyof typeof modifiedData.ambientes] !==
			originalData.ambientes[key as keyof typeof originalData.ambientes]
		) {
			ambientesChanges[key] = modifiedData.ambientes[key as keyof typeof modifiedData.ambientes];
		}
	});
	if (Object.keys(ambientesChanges).length > 0) {
		changes.ambientes = ambientesChanges;
	}

	// Comparar características
	const caracteristicasChanges: Record<string, boolean> = {};
	Object.keys(modifiedData.caracteristicas).forEach((key) => {
		if (
			modifiedData.caracteristicas[key as keyof typeof modifiedData.caracteristicas] !==
			originalData.caracteristicas[key as keyof typeof originalData.caracteristicas]
		) {
			caracteristicasChanges[key] =
				modifiedData.caracteristicas[key as keyof typeof modifiedData.caracteristicas];
		}
	});
	if (Object.keys(caracteristicasChanges).length > 0) {
		changes.caracteristicas = caracteristicasChanges;
	}

	// Comparar detalles
	const detallesChanges: Record<string, unknown> = {};
	Object.keys(modifiedData.detalles).forEach((key) => {
		if (
			modifiedData.detalles[key as keyof typeof modifiedData.detalles] !==
			originalData.detalles[key as keyof typeof originalData.detalles]
		) {
			detallesChanges[key] = modifiedData.detalles[key as keyof typeof modifiedData.detalles];
		}
	});
	if (Object.keys(detallesChanges).length > 0) {
		changes.detalles = detallesChanges;
	}

	// Comparar servicios
	const serviciosChanges: Record<string, boolean> = {};
	Object.keys(modifiedData.servicios).forEach((key) => {
		if (
			modifiedData.servicios[key as keyof typeof modifiedData.servicios] !==
			originalData.servicios[key as keyof typeof originalData.servicios]
		) {
			serviciosChanges[key] = modifiedData.servicios[key as keyof typeof modifiedData.servicios];
		}
	});
	if (Object.keys(serviciosChanges).length > 0) {
		changes.servicios = serviciosChanges;
	}

	// Comparar precios - lógica más inteligente
	const preciosChanges: Array<{
		estado_publicacion_id: number;
		delete?: boolean;
		importe?: number;
		divisa?: string;
	}> = [];

	// Obtener IDs de precios originales y modificados
	const originalPrecioIds = originalData.precios.map((p) => p.estado_publicacion_id);
	const modifiedPrecioIds = modifiedData.precios.map((p) => p.estado_publicacion_id);

	// Precios que se eliminaron (estaban en original pero no en modificado)
	const preciosEliminados = originalPrecioIds.filter((id) => !modifiedPrecioIds.includes(id));
	preciosEliminados.forEach((id) => {
		preciosChanges.push({
			estado_publicacion_id: id,
			delete: true,
		});
	});

	// Precios que se modificaron o agregaron
	modifiedData.precios.forEach((modifiedPrecio) => {
		const originalPrecio = originalData.precios.find(
			(p) => p.estado_publicacion_id === modifiedPrecio.estado_publicacion_id,
		);

		// Si no existía antes, es nuevo
		if (!originalPrecio) {
			preciosChanges.push({
				estado_publicacion_id: modifiedPrecio.estado_publicacion_id,
				delete: false,
				importe: modifiedPrecio.importe,
				divisa: modifiedPrecio.divisa,
			});
		} else {
			// Si existía, verificar si cambió
			const cambioImporte = originalPrecio.importe !== modifiedPrecio.importe;
			const cambioDivisa = originalPrecio.divisa !== modifiedPrecio.divisa;

			if (cambioImporte || cambioDivisa) {
				preciosChanges.push({
					estado_publicacion_id: modifiedPrecio.estado_publicacion_id,
					delete: false,
					importe: modifiedPrecio.importe,
					divisa: modifiedPrecio.divisa,
				});
			}
		}
	});

	if (preciosChanges.length > 0) {
		changes.precios = preciosChanges;
	}

	return changes;
};
