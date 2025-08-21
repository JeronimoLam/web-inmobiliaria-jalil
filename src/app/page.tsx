import { HomeScreen } from "@/modules/home/screens/HomeScreen";

export default function Home() {
	return (
		<main>
			<HomeScreen
				propertyTypes={propertyTypes}
				localities={localities}
				heroImages={heroImages}
				properties={properties}
			/>
		</main>
	);
}

const heroImages = ["/images/carousel0.webp", "/images/carousel1.webp", "/images/carousel2.webp"];

const propertyTypes = [
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
	},
];

const localities = [
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
];

const properties = [
	{
		images: ["/images/c0004941v.jpg", "/images/c0004951v.jpg", "/images/c0005511v.jpg"],
		type: "Departamento",
		location: "Miami",
		title: "Collins Ave 5401 (Miami)",
		bedrooms: 1,
		area: 61.0,
		bathrooms: 1,
		code: "494",
	},
	{
		images: ["/images/c0005511v.jpg", "/images/0006121v.jpg", "/images/c0004951v.jpg"],
		type: "Departamento",
		location: "Miami",
		title: "Brickell Bay Drive 1200",
		bedrooms: 2,
		area: 85.5,
		bathrooms: 2,
		code: "495",
	},
	{
		images: ["/images/c0002311v.jpg", "/images/0006121v.jpg", "/images/c0004941v.jpg"],
		type: "Apartamento",
		location: "South Beach",
		title: "Ocean Drive 850",
		bedrooms: 3,
		area: 120.0,
		bathrooms: 2,
		code: "496",
	},
	{
		images: ["/images/c0004951v.jpg", "/images/c0004941v.jpg", "/images/c0005511v.jpg"],
		type: "Apartamento",
		location: "South Beach",
		title: "Ocean Drive 850",
		bedrooms: 3,
		area: 120.0,
		bathrooms: 2,
		code: "497",
	},
];
