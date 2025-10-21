import { PageContainer } from "@/components/layouts/PageContainer";
import { AnimatedSlide } from "@/components/AnimatedSlide";
import { TasacionesForm } from "@/modules/tasaciones/components/TasacionesForm";
import { tasacionesMetadata } from "@/config/seo/metadata";

export const metadata = tasacionesMetadata;

export default function TasacionesPage() {
	return (
		<>
			<section>
				<PageContainer className="py-8 sm:py-10 flex flex-col sm:gap-10 gap-8 sm:!max-w-[50rem] xl:!max-w-[50rem] 2xl:!max-w-[50rem]">
					<div className="flex flex-col gap-4">
						<AnimatedSlide delay={0.1}>
							<h1 className="text-3xl md:text-3xl lg:text-4xl font-semibold">Tasaciones</h1>
						</AnimatedSlide>
						<AnimatedSlide delay={0.3}>
							<p className="text-pretty text-sm md:text-base">
								Ofrecemos un servicio profesional de tasación de inmuebles, realizado por expertos
								matriculados con amplia experiencia. Nos comunicaremos con usted para conocer más
								detalles sobre su propiedad, coordinar la tasación y brindarle asesoramiento en la
								compraventa.
							</p>
						</AnimatedSlide>
					</div>
					<TasacionesForm />
				</PageContainer>
			</section>
		</>
	);
}
