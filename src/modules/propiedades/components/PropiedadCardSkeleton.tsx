import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PropiedadCardSkeleton() {
	return (
		<Card className="w-full md:h-[280px] flex md:flex-row">
			{/* Image skeleton */}
			<div className="min-h-[220px] md:min-w-[380px] md:h-full relative">
				<Skeleton className="w-full h-[220px] md:h-[280px] rounded-none bg-neutral-300/80" />
			</div>

			{/* Content skeleton */}
			<div className="flex flex-col w-full h-full">
				{/* Property Information */}
				<div className="p-[15px] pb-0 flex-1">
					<div className="flex items-center justify-between mb-4">
						<Skeleton className="h-4 w-32 bg-neutral-300/80" />
						<Skeleton className="h-6 w-16 rounded-full bg-neutral-300/80" />
					</div>

					{/* Title skeleton */}
					<Skeleton className="h-6 w-3/4 mb-4 bg-neutral-300/80" />

					{/* Property Details skeleton */}
					<div className="space-y-2 mb-3">
						<div className="flex items-center gap-2">
							<Skeleton className="h-[22px] w-[22px] rounded bg-neutral-300/80" />
							<Skeleton className="h-4 w-20 bg-neutral-300/80" />
							<Skeleton className="h-4 w-8 bg-neutral-300/80" />
						</div>

						<div className="flex items-center gap-2">
							<Skeleton className="h-[22px] w-[22px] rounded bg-neutral-300/80" />
							<Skeleton className="h-4 w-24 bg-neutral-300/80" />
							<Skeleton className="h-4 w-12 bg-neutral-300/80" />
						</div>

						<div className="flex items-center gap-2">
							<Skeleton className="h-[22px] w-[22px] rounded bg-neutral-300/80" />
							<Skeleton className="h-4 w-16 bg-neutral-300/80" />
							<Skeleton className="h-4 w-8 bg-neutral-300/80" />
						</div>
					</div>
				</div>

				{/* Price button skeleton */}
				<div className="w-full px-4 py-4 bg-neutral-300/80">
					<Skeleton className="h-6 w-32 bg-white" />
				</div>
			</div>
		</Card>
	);
}
