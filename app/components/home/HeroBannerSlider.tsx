"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import { heroImages } from "@/lib/data/heroImages"
import { useCarousel } from "@/hooks/useCarousel"

function HeroBannerSlider() {
  const { api, setApi, current, count, plugin } = useCarousel(5000)

  return (
    <section className="-mt-8 relative">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={() => plugin.current.play()}
      >
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={index}>
              <Link
                key={index}
                href="/products"
                title="Ir a la página de productos"
              >
                <Card className="bg-red-200 p-0 rounded-none w-full border-none">
                  <CardContent className="p-0">
                    <Image
                      src={image}
                      alt={`Ecoshop Banner Image ${index + 1}`}
                      width={900}
                      height={377}
                      className="max-h-120 w-full object-cover"
                      priority={index === 0}
                    />
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 border-none cursor-pointer hover:text-white" />
        <CarouselNext className="right-4 border-none cursor-pointer hover:text-white" />
      </Carousel>

      <div className="absolute flex justify-center gap-2 bottom-4 left-1/2 -translate-x-1/2 z-10">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === current
                ? "bg-secondary w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroBannerSlider
