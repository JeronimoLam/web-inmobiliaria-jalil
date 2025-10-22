import { CreatePropiedad } from "../types/create-propiedad.types";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { transformPropiedadToFormData } from "./transformPropiedadToFormData";

export const getChangedFields = (originalPropiedad: Propiedad, modifiedData: CreatePropiedad) => {
	const originalData = transformPropiedadToFormData(originalPropiedad);
	const changes: Record<string, unknown> = {};

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
	if (modifiedData.propiedad.has_expensas !== originalData.propiedad.has_expensas) {
		propiedadChanges.has_expensas = modifiedData.propiedad.has_expensas;
	}
	if (
		JSON.stringify(modifiedData.propiedad.map_location) !==
		JSON.stringify(originalData.propiedad.map_location)
	) {
		propiedadChanges.map_location = modifiedData.propiedad.map_location;
	}

	const modifiedExpensasValue = modifiedData.propiedad.expensas_value ?? null;
	const originalExpensasValue = originalData.propiedad.expensas_value ?? null;

	if (modifiedExpensasValue !== originalExpensasValue) {
		propiedadChanges.expensas_value = modifiedData.propiedad.expensas_value;
	}

	const modifiedExpensasDivisa = modifiedData.propiedad.expensas_divisa ?? null;
	const originalExpensasDivisa = originalData.propiedad.expensas_divisa ?? null;

	if (modifiedExpensasDivisa !== originalExpensasDivisa) {
		propiedadChanges.expensas_divisa = modifiedData.propiedad.expensas_divisa;
	}

	if (Object.keys(propiedadChanges).length > 0) {
		changes.propiedad = propiedadChanges;
	}

	if (modifiedData.localidad_name !== originalData.localidad_name) {
		changes.localidad_name = modifiedData.localidad_name;
	}

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

	const preciosChanges: Array<{
		estado_publicacion_id: number;
		delete?: boolean;
		importe?: number;
		divisa?: string;
	}> = [];

	const originalPrecioIds = originalData.precios.map((p) => p.estado_publicacion_id);
	const modifiedPrecioIds = modifiedData.precios.map((p) => p.estado_publicacion_id);

	const preciosEliminados = originalPrecioIds.filter((id) => !modifiedPrecioIds.includes(id));
	preciosEliminados.forEach((id) => {
		preciosChanges.push({
			estado_publicacion_id: id,
			delete: true,
		});
	});

	modifiedData.precios.forEach((modifiedPrecio) => {
		const originalPrecio = originalData.precios.find(
			(p) => p.estado_publicacion_id === modifiedPrecio.estado_publicacion_id,
		);

		if (!originalPrecio) {
			preciosChanges.push({
				estado_publicacion_id: modifiedPrecio.estado_publicacion_id,
				delete: false,
				importe: modifiedPrecio.importe,
				divisa: modifiedPrecio.divisa,
			});
		} else {
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

	type Image = { url: string; principal: boolean };
	function imagesChanged(imgs1: Image[], imgs2: Image[]) {
		if (imgs1.length !== imgs2.length) return true;

		return imgs1.some((img, i) => {
			return img.url !== imgs2[i].url || img.principal !== imgs2[i].principal;
		});
	}

	if (imagesChanged(originalData.imagenes, modifiedData.imagenes)) {
		changes.imagenes = modifiedData.imagenes;
	}

	return changes;
};
