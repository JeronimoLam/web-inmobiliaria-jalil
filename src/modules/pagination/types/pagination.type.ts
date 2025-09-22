export type PaginationParams = {
	page: number;
	limit: number;
};

export type PaginationResponse = {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	startIndex: number;
	endIndex: number;
};

export type PaginatedResponse<T> = {
	data: T[];
	pagination: PaginationResponse;
};

export interface CreatePaginationResponse extends PaginationParams {
	from: number;
	to: number;
	totalItems: number;
}
