import { Spinner } from "@/components/ui/Spinner";

export const AdminLoader = ({ text = "" }: { text: string }) => {
	return (
		<div className="px-4 py-6 sm:p-6 flex flex-col gap-4 justify-center items-center min-h-[calc(100vh-61px)]">
			<div>{text}</div>
			<Spinner />
		</div>
	);
};
