import { OperacionesEnum } from "@/modules/propiedades/enums/propiedades.enum";
import { Propiedad } from "@/modules/propiedades/types/propiedad.type";
import { getPropiedadDetailUrl } from "@/modules/propiedades/utils/getPropiedadDetailUrl";

describe("getPropiedadDetailUrl", () => {
	it("debe generar la URL correcta para venta", () => {
		const propiedad: Partial<Propiedad> = {
			calle: "Calle Falsa",
			numero: 123,
			tipo_propiedad: { id: 1, value: "Departamento" },
			localidad: { id: 1, nombre: "Buenos Aires" },
			codigo: 1,
			precios: [
				{
					id: 1,
					divisa: "ARS",
					importe: 100000,
					created_at: new Date(),
					updated_at: new Date(),
					estado_publicacion: { id: OperacionesEnum.VENTA, nombre: "Venta" }, // 2
				},
			],
		};

		const url = getPropiedadDetailUrl(propiedad as Propiedad);

		expect(url).toBe(
			"/propiedades/detalle/departamento-en-venta-buenos-aires-calle-falsa-nro-123-1?operacion=2",
		);
	});

	it("debe generar la URL correcta para alquiler si no hay numero", () => {
		const propiedad: Partial<Propiedad> = {
			calle: "Av. Siempre Viva",
			tipo_propiedad: { id: 2, value: "Casa" },
			localidad: { id: 2, nombre: "Córdoba" },
			codigo: 2,
			precios: [
				{
					id: 2,
					divisa: "ARS",
					importe: 50000,
					created_at: new Date(),
					updated_at: new Date(),
					estado_publicacion: { id: OperacionesEnum.ALQUILER, nombre: "Alquiler" }, // 1
				},
			],
		};

		const url = getPropiedadDetailUrl(propiedad as Propiedad);

		expect(url).toBe("/propiedades/detalle/casa-en-alquiler-cordoba-av-siempre-viva-2?operacion=1");
	});

	it("debe usar 'consulta' si no hay estado_publicacion", () => {
		const propiedad: Partial<Propiedad> = {
			calle: "Calle Sin Estado",
			tipo_propiedad: { id: 3, value: "Departamento" },
			localidad: { id: 3, nombre: "Rosario" },
			codigo: 3,
			precios: [], // no hay estado_publicacion
		};

		const url = getPropiedadDetailUrl(propiedad as Propiedad);

		expect(url).toContain("en-consulta");
	});
});
