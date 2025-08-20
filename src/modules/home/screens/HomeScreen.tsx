"use client"
import { PageContainer } from '@/components/layouts/PageContainer';
import { HomeHeroSlider } from '../components/HomeHeroSlider';
import { PropertySearchForm } from '../../../components/PropertySearchForm';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface HomeScreenProps {
    tiposDePropiedad: { value: string; label: string }[];
    localidades: { value: string; label: string }[];
    heroImages: string[];
}

export const HomeScreen = ({
    tiposDePropiedad,
    localidades,
    heroImages
}: HomeScreenProps) => {
    const [operacion, setOperacion] = useState<"venta" | "alquiler">("venta");

    const handleVentaSelect = () => setOperacion("venta");
    const handleAlquilerSelect = () => setOperacion("alquiler");

    const handleSearch = ({ tipoPropiedad, localidad }: { tipoPropiedad: string; localidad: string }) => {
        console.log({
            tipoPropiedad: tipoPropiedad || null,
            localidad: localidad || null,
            operacion
        });
    };

    return (
        <>
            <section id="home-hero" className='relative bg-black z-10'>
                <HomeHeroSlider images={heroImages} slideDuration={5} />

                <div className='absolute top-0 h-full xl:h-1/2 w-full flex items-center xl:items-end justify-center text-white'>
                    <PageContainer>
                        <div className='flex flex-col gap-7'>
                            <h1 className='text-4xl sm:text-5xl md:text-6xl font-semibold w-fit'>Encontramos tu lugar ideal</h1>
                            <div className='flex flex-col gap-4'>
                                <div className='flex gap-2'>
                                    <Button
                                        onClick={handleVentaSelect}
                                        variant={operacion === "venta" ? "default" : "tertiary"}
                                        className='px-7 py-5 font-semibold'>
                                        Venta
                                    </Button>
                                    <Button
                                        onClick={handleAlquilerSelect}
                                        variant={operacion === "alquiler" ? "default" : "tertiary"}
                                        className='px-7 py-5 font-semibold'>
                                        Alquiler
                                    </Button>
                                </div>
                                <div className='md:w-[650px]'>
                                    <PropertySearchForm
                                        tiposDePropiedad={tiposDePropiedad}
                                        localidades={localidades}
                                        onSearch={handleSearch}
                                    />
                                </div>
                            </div>
                        </div>
                    </PageContainer>
                </div>
            </section>
        </>
    );
}

