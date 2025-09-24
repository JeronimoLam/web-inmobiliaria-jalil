import { PageContainer } from "@/components/layouts/PageContainer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PhoneInput from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AnimatedSlide } from "@/components/AnimatedSlide";

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
								Le brindamos un servicio profesional de tasación de inmuebles a cargo de
								profesionales matriculados y experimentados en el área. Nos comunicaremos con Ud.
								para más detalles sobre la propiedad y establecer el mejor momento para realizar la
								tasación y asesorar la compraventa.
							</p>
						</AnimatedSlide>
					</div>
					<form action="">
						<div className="flex flex-col gap-6">
							<Input type="text" placeholder="Nombre" className="bg-white text-sm md:text-base" />
							<RadioGroup
								defaultValue="alquilar"
								className="flex gap-6 sm:gap-16 justify-between sm:justify-center"
							>
								<div className="flex items-center gap-2">
									<RadioGroupItem
										value="alquilar"
										id="alquilar"
										className="bg-white cursor-pointer"
									/>
									<Label
										htmlFor="alquilar"
										className="font-normal cursor-pointer text-sm md:text-base"
									>
										Quiero <span className="text-secondary font-bold">alquilar</span> mi propiedad
									</Label>
								</div>
								<div className="flex items-center gap-2">
									<RadioGroupItem
										value="comprar"
										id="comprar"
										className="bg-white cursor-pointer"
									/>
									<Label
										htmlFor="comprar"
										className="font-normal cursor-pointer text-sm md:text-base"
									>
										Quiero <span className="text-secondary font-bold">comprar</span> mi propiedad
									</Label>
								</div>
							</RadioGroup>
							<div className="flex flex-col gap-4">
								<Input
									type="text"
									placeholder="Dirección"
									className="bg-white text-sm md:text-base"
								/>
								<Input type="email" placeholder="Email" className="bg-white text-sm md:text-base" />
								<PhoneInput name="phone" className="bg-white text-sm md:text-base" />
								<Textarea placeholder="Mensaje" className="bg-white text-sm md:text-base" />
							</div>
							<div className="flex justify-between">
								<div className="flex items-center gap-2">
									<Checkbox className="bg-white" id="prefiero-que-me-llamen" />
									<Label
										htmlFor="prefiero-que-me-llamen"
										className="font-normal cursor-pointer text-sm md:text-base"
									>
										Prefiero que me llamen
									</Label>
								</div>
								<Button type="submit" className="text-sm md:text-base py-5 px-7">
									Enviar
								</Button>
							</div>
						</div>
					</form>
				</PageContainer>
			</section>
		</>
	);
}
