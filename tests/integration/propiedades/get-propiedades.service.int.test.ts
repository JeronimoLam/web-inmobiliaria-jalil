// Leer variable s de entorno desde process.env

import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";
import {
	getPropiedades,
	type GetPropiedadesParams,
} from "@/modules/propiedades/services/get-propiedades.service";

describe("PropiedadesService.getAll - integración real con Supabase", () => {
	it("debe devolver propiedades de venta con filtros y paginación", async () => {
		const params: Partial<GetPropiedadesParams> = {
			operacion: OperacionesEnum.VENTA,
			filters: { tipoPropiedad: "Casa" },
			pagination: { page: 1, limit: 5 },
		};

		const result = await getPropiedades(params as GetPropiedadesParams);

		expect(result).toHaveProperty("data");
		expect(result).toHaveProperty("pagination");
		expect(Array.isArray(result.data)).toBe(true);

		// Validar que todas las propiedades sean del tipo filtrado
		result.data.forEach((prop) => {
			expect(prop.tipo_propiedad.value).toBe("Casa");
		});

		// Validar paginación
		const { pagination } = result;
		expect(pagination.currentPage).toBe(params.pagination?.page);
		expect(pagination.itemsPerPage).toBe(params.pagination?.limit);
		expect(pagination.totalItems).toBeGreaterThanOrEqual(result.data.length);
	});

	it("debe devolver propiedades de venta sin paginación explícita", async () => {
		const params: Partial<GetPropiedadesParams> = {
			operacion: OperacionesEnum.VENTA,
			filters: { tipoPropiedad: "Casa" },
		};

		const result = await getPropiedades(params as GetPropiedadesParams);

		expect(result.data).toBeInstanceOf(Array);
		expect(result.pagination).toHaveProperty("currentPage");
		expect(result.pagination).toHaveProperty("itemsPerPage");
		expect(result.pagination.totalItems).toBeGreaterThanOrEqual(result.data.length);
	});

	it("debe devolver todas las propiedades sin filtros ni paginación", async () => {
		const params: Partial<GetPropiedadesParams> = {};

		const result = await getPropiedades(params as GetPropiedadesParams);

		expect(result.data).toBeInstanceOf(Array);
		expect(result.pagination.totalItems).toBeGreaterThanOrEqual(result.data.length);
	});
});
