import { CreatePaginationResponse, PaginationResponse } from "../types/pagination.type";

export const createPaginationResponse = (params: CreatePaginationResponse): PaginationResponse => {
	const { page, limit, from, to, totalItems } = params;
	const totalPages = Math.ceil(totalItems / limit);

	return {
		currentPage: page,
		totalPages,
		totalItems,
		itemsPerPage: to - from + 1,
		hasNextPage: page < totalPages,
		hasPreviousPage: from > 0,
		startIndex: from,
		endIndex: to,
	};
};
