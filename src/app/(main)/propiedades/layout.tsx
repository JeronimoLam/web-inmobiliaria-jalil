import { FiltersProvider } from "@/modules/propiedades/context/FiltersContext";

export default function PropiedadesLayout({ children }: { children: React.ReactNode }) {
	return <FiltersProvider>{children}</FiltersProvider>;
}
