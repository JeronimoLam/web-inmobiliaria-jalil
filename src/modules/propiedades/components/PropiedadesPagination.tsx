import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
}

export const PropiedadesPagination = ({
	currentPage,
	totalPages,
	onPageChange,
	className = "",
}: CustomPaginationProps) => {
	if (totalPages <= 1) return null;

	return (
		<div className={`mt-8 ${className}`}>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href="#"
							onClick={(e) => {
								e.preventDefault();
								if (currentPage > 1) {
									onPageChange(currentPage - 1);
								}
							}}
							className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
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
										onPageChange(page);
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
								if (currentPage < totalPages) {
									onPageChange(currentPage + 1);
								}
							}}
							className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};
