"use client";
import { FunnelIcon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetBody,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useDirection } from "@radix-ui/react-direction";
import { useState } from "react";

export default function DemoSheet() {
	const direction = useDirection();
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="outline" className="w-full sm:w-auto py-selects font-semibold">
					<FunnelIcon width={24} height={24} /> Filtros ({0})
				</Button>
			</SheetTrigger>

			<SheetContent dir={direction} side="left" className="z-50">
				<SheetHeader>
					<SheetTitle>Quick Feedback</SheetTitle>
					<SheetDescription>Share your feedback to help us improve.</SheetDescription>
				</SheetHeader>
				<SheetBody>
					<div className="grid gap-5">
						{/* Name */}
						<div className="flex flex-col gap-2">
							<Label htmlFor="name">Name</Label>
							<Input id="name" placeholder="Your Name" />
						</div>
						{/* Email */}
						<div className="flex flex-col gap-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" placeholder="Your Email" />
						</div>
						{/* Feedback */}
						<div className="flex flex-col gap-2">
							<Label htmlFor="feedback">Feedback</Label>
							<Textarea id="feedback" placeholder="Describe your suggestion." rows={4} />
							<p className="text-sm text-muted-foreground">
								Please don’t include any sensitive information
							</p>
						</div>
					</div>
				</SheetBody>
				<SheetFooter>
					<SheetClose asChild>
						<Button variant="outline">Cancel</Button>
					</SheetClose>
					<SheetClose asChild>
						<Button type="submit">Submit Feedback</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
