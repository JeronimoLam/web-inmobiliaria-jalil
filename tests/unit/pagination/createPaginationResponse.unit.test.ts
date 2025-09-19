import { createPaginationResponse } from "@/modules/pagination/utils/createPaginationResponse";

describe("createPaginationResponse", () => {
	it("debe retornar la respuesta de paginación correcta para un caso típico", () => {
		const params = {
			page: 2,
			limit: 10,
			from: 10,
			to: 19,
			totalItems: 35,
		};
		const result = createPaginationResponse(params);
		expect(result).toEqual({
			currentPage: 2,
			totalPages: 4,
			totalItems: 35,
			itemsPerPage: 10,
			hasNextPage: true,
			hasPreviousPage: true,
			startIndex: 10,
			endIndex: 19,
		});
	});

	it("debe indicar que no hay página siguiente en la última página", () => {
		const params = {
			page: 4,
			limit: 10,
			from: 30,
			to: 34,
			totalItems: 35,
		};
		const result = createPaginationResponse(params);
		expect(result.hasNextPage).toBe(false);
		expect(result.hasPreviousPage).toBe(true);
	});

	it("debe indicar que no hay página anterior en la primera página", () => {
		const params = {
			page: 1,
			limit: 10,
			from: 0,
			to: 9,
			totalItems: 35,
		};
		const result = createPaginationResponse(params);
		expect(result.hasPreviousPage).toBe(false);
		expect(result.hasNextPage).toBe(true);
	});
});
