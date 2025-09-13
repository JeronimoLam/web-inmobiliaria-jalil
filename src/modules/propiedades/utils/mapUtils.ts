import { polygon, booleanPointInPolygon, point } from "@turf/turf";
import { Propiedad, EstadoPublicacionEnum } from "../types/propiedad.type";
import { buildPropiedadTitle } from "./propiedadPropertyBuilder";

export interface PropiedadMapInfo {
	title: string;
	precioDisplay: string;
}

export interface MapCenter {
	lat: number;
	lng: number;
}

export type PolygonGeoJson = {
	type: "Polygon";
	coordinates: number[][][];
};

// Constantes
export const DEFAULT_MAP_CENTER: MapCenter = { lat: -34.6118, lng: -58.396 };

export const POLYGON_OPTIONS = {
	fillColor: "#FF0000",
	fillOpacity: 0.3,
	strokeWeight: 2,
	clickable: false,
	editable: true,
	zIndex: 1,
};

export const getPropiedadMapInfo = (propiedad: Propiedad): PropiedadMapInfo => {
	const title = buildPropiedadTitle(propiedad);

	const precio = propiedad.precios.find(
		(p) =>
			(p.estado_publicacion.nombre === EstadoPublicacionEnum.VENTA ||
				p.estado_publicacion.nombre === EstadoPublicacionEnum.ALQUILER) &&
			p.importe > 0,
	);

	const precioDisplay = precio
		? `${precio.divisa} ${precio.importe.toLocaleString()}${
				precio.estado_publicacion.nombre === EstadoPublicacionEnum.ALQUILER ? "/mes" : ""
			}`
		: "Consultar";

	return { title, precioDisplay };
};

// Función auxiliar para calcular el centro del mapa
export function calculateMapCenter(propiedades: Propiedad[]): MapCenter {
	if (propiedades.length === 0) return DEFAULT_MAP_CENTER;
	if (propiedades.length === 1)
		return {
			lat: propiedades[0].map_location.coordinates[0],
			lng: propiedades[0].map_location.coordinates[1],
		};

	const sumLat = propiedades.reduce((sum, prop) => sum + prop.map_location.coordinates[0], 0);
	const sumLng = propiedades.reduce((sum, prop) => sum + prop.map_location.coordinates[1], 0);

	return { lat: sumLat / propiedades.length, lng: sumLng / propiedades.length };
}

// Función para filtrar propiedades dentro de un polígono
export function filterPropertiesInPolygon(
	propiedades: Propiedad[],
	polygonGeoJson: PolygonGeoJson,
): Propiedad[] {
	return propiedades.filter((prop) => {
		const pointGeometry = point(prop.map_location.coordinates);
		return booleanPointInPolygon(pointGeometry, polygonGeoJson);
	});
}

// Función para crear un polígono GeoJSON desde coordenadas de Google Maps
export function createPolygonFromPath(path: google.maps.LatLng[]): PolygonGeoJson {
	const coordinates = path.map((latLng) => [latLng.lat(), latLng.lng()]);
	const geoJson = polygon([[...coordinates, coordinates[0]]]);
	return geoJson.geometry;
}
