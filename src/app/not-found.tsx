import { OutOfService } from "@/components/OutOfService";

// Any unknown route also shows the out-of-service view — nothing else is reachable.
export default function NotFound() {
	return <OutOfService />;
}
