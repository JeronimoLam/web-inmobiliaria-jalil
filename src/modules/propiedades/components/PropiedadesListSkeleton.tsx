import { PropiedadCardSkeleton } from "./PropiedadCardSkeleton";
import { PageContainer } from "@/components/layouts/PageContainer";
import { Skeleton } from "@/components/ui/skeleton";

interface PropiedadesListSkeletonProps {
	count?: number;
}

export function PropiedadesListSkeleton({ count = 6 }: PropiedadesListSkeletonProps) {
	return (
		<PageContainer>
			<div className="min-h-[calc(100vh-150px)] flex flex-col">
				<div className="w-full flex flex-col gap-6 pt-2 flex-1 pb-16">
					<div className="flex items-center gap-2">
						<Skeleton className="h-5 w-24 bg-neutral-300/80" />
						<Skeleton className="h-5 w-20 bg-neutral-300/80" />
						<Skeleton className="h-5 w-16 bg-neutral-300/80" />
					</div>

					<div className="space-y-6">
						{Array.from({ length: count }).map((_, index) => (
							<PropiedadCardSkeleton key={index} />
						))}
					</div>
				</div>
			</div>
		</PageContainer>
	);
}
