"use client";

import { motion } from "framer-motion";

export const SuccessMessage = ({ message }: { message: string }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="flex flex-col items-center justify-center p-8 rounded-lg bg-green-100"
		>
			<motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" className="w-14 h-14">
				<motion.circle
					cx="26"
					cy="26"
					r="25"
					fill="none"
					stroke="#22c55e"
					strokeWidth="2"
					strokeLinecap="round"
					strokeDasharray="157"
					strokeDashoffset="157"
					animate={{ strokeDashoffset: 0 }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
				/>
				<motion.path
					fill="none"
					stroke="#22c55e"
					strokeWidth="4"
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M14 27l7 7 17-17"
					strokeDasharray="36"
					strokeDashoffset="36"
					animate={{ strokeDashoffset: 0 }}
					transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
				/>
			</motion.svg>

			<p className="mt-4 text-green-800 font-medium text-center text-pretty">{message}</p>
		</motion.div>
	);
};
