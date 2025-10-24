import { useState, useMemo, useEffect } from "react";

interface UsePaginationProps<T> {
	items: T[];
	itemsPerPage?: number;
}

interface UsePaginationReturn<T> {
	currentItems: T[];
	currentPage: number;
	totalPages: number;
	totalItems: number;
	startIndex: number;
	endIndex: number;
	handlePageChange: (page: number) => void;
}

export const usePagination = <T>({
	items,
	itemsPerPage = 5,
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
	const [currentPage, setCurrentPage] = useState(1);

	const totalItems = items.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const currentItems = useMemo(
		() => items.slice(startIndex, endIndex),
		[items, startIndex, endIndex],
	);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	// Resetear página cuando cambien los items (por filtros, búsquedas, etc.)
	useEffect(() => {
		setCurrentPage(1);
	}, [items.length]);

	return {
		currentItems,
		currentPage,
		totalPages,
		totalItems,
		startIndex,
		endIndex,
		handlePageChange,
	};
};
