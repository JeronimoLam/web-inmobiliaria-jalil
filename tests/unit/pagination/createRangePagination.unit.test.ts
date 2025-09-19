import { createRangePagination } from "@/modules/pagination/utils/createRangePagination";

describe("createRangePagination", () => {
	it("debe calcular correctamente el rango para page=2 y limit=10", () => {
		const params = { page: 2, limit: 10 };
		const result = createRangePagination(params);
		expect(result).toEqual({ from: 10, to: 19 });
	});

	it("debe calcular correctamente el rango para page=1 y limit=5", () => {
		const params = { page: 1, limit: 5 };
		const result = createRangePagination(params);
		expect(result).toEqual({ from: 0, to: 4 });
	});
});
