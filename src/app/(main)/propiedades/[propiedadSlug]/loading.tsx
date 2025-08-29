import { Spinner } from "@/components/ui/Spinner";

export default function Loading() {
	return (
		<div className="flex justify-center items-center h-[calc(100vh-70px)]">
			<Spinner size={60} />
		</div>
	);
}
