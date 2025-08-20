import { HomeScreen } from "@/modules/home/screens/HomeScreen";

export default function Home() {
  return (
    <main>
      <HomeScreen
        tiposDePropiedad={tiposDePropiedad}
        localidades={localidades}
        heroImages={heroImages}
      />
    </main>
  );
}

const heroImages = [
  "/images/carousel0.webp",
  "/images/carousel1.webp",
  "/images/carousel2.webp"
];


const tiposDePropiedad = [
  {
    value: "casa",
    label: "Casa",
  },
  {
    value: "departamento",
    label: "Departamento",
  },
  {
    value: "terreno",
    label: "Terreno",
  },
  {
    value: "local",
    label: "Local",
  },
  {
    value: "construccion",
    label: "Construcción",
  },
  {
    value: "cochera",
    label: "Cochera",
  }
]

const localidades = [
  {
    value: "la-plata",
    label: "La Plata",
  },
  {
    value: "buenos-aires",
    label: "Buenos Aires",
  },
  {
    value: "city-bell",
    label: "City Bell",
  },
  {
    value: "berisso",
    label: "Berisso",
  },
  {
    value: "tolosa",
    label: "Tolosa",
  },
  {
    value: "ringuelet",
    label: "Ringuelet",
  },
  {
    value: "gorina",
    label: "Gorina",
  },
  {
    value: "melchor-romero",
    label: "Melchor Romero",
  },
  {
    value: "el-pato",
    label: "El Pato",
  },
  {
    value: "san-carlos",
    label: "San Carlos",
  },
  {
    value: "villa-elisa",
    label: "Villa Elisa",
  },
]