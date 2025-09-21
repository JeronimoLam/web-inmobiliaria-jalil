import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationResponse } from "@/modules/pagination/types/pagination.type";

interface PropiedadesPaginationProps {
	pagination: PaginationResponse;
	handlePageChange: (page: number) => void;
	className?: string;
}

export const PropiedadesPagination = ({
	pagination,
	handlePageChange,
	className = "",
}: PropiedadesPaginationProps) => {
	const { currentPage, totalPages, hasNextPage, hasPreviousPage } = pagination;

	if (totalPages <= 1) return null;

	return (
		<div className={`${className}`}>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href="#"
							onClick={(e) => {
								e.preventDefault();
								if (hasPreviousPage) {
									handlePageChange(currentPage - 1);
								}
							}}
							className={!hasPreviousPage ? "pointer-events-none opacity-50" : ""}
						/>
					</PaginationItem>

					{/* Páginas */}
					{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
						// Mostrar siempre primera página, última página, página actual y páginas adyacentes
						const shouldShow =
							page === 1 ||
							page === totalPages ||
							(page >= currentPage - 1 && page <= currentPage + 1);

						if (!shouldShow) {
							// Mostrar ellipsis cuando hay un salto
							if (page === currentPage - 2 || page === currentPage + 2) {
								return (
									<PaginationItem key={page}>
										<PaginationEllipsis />
									</PaginationItem>
								);
							}
							return null;
						}

						return (
							<PaginationItem key={page}>
								<PaginationLink
									href="#"
									onClick={(e) => {
										e.preventDefault();
										handlePageChange(page);
									}}
									isActive={page === currentPage}
								>
									{page}
								</PaginationLink>
							</PaginationItem>
						);
					})}

					<PaginationItem>
						<PaginationNext
							href="#"
							onClick={(e) => {
								e.preventDefault();
								if (hasNextPage) {
									handlePageChange(currentPage + 1);
								}
							}}
							className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};
