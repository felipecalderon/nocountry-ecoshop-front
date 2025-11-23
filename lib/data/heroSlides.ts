import { HeroSlide } from "@/types"
import HeroImage1 from "@/public/images/hero-banner1.webp"
import HeroImage2 from "@/public/images/hero-banner2.webp"
import HeroImage3 from "@/public/images/hero-banner3.webp"
import HeroImage4 from "@/public/images/hero-banner4.webp"
import HeroImage5 from "@/public/images/hero-banner5.webp"

export const heroSlides: HeroSlide[] = [
  {
    image: HeroImage1,
    title: "Alimenta tu bienestar desde la mesa",
    subtitle:
      "Redescubre el placer de comer sano con productos que cuidan tu cuerpo y tu rutina diaria.",
    buttonText: "Conoce más",
    buttonLink: "/products",
  },
  {
    image: HeroImage2,
    title: "Productos ecológicos para un mundo mejor",
    subtitle:
      "Encuentra alternativas sostenibles que protegen tu salud y aportan a un planeta más verde.",
    buttonText: "Comprar ahora",
    buttonLink: "/products",
  },
  {
    image: HeroImage3,
    title: "Ingredientes naturales, beneficios reales",
    subtitle:
      "Explora nuestra selección de productos elaborados con ingredientes naturales y llenos de nutrientes.",
    buttonText: "Explorar",
    buttonLink: "/products",
  },
  {
    image: HeroImage4,
    title: "Construyamos juntos una vida más saludable",
    subtitle:
      "Únete a nuestra comunidad y forma parte del movimiento hacia un estilo de vida consciente y sostenible.",
    buttonText: "Ver más",
    buttonLink: "/about",
  },
  {
    image: HeroImage5,
    title: "Calidad que se siente en cada detalle",
    subtitle:
      "Disfruta productos premium creados con dedicación, transparencia y altos estándares de calidad.",
    buttonText: "Descubrir",
    buttonLink: "/products",
  },
]
