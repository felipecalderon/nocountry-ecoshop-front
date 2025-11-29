"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import { heroSlides } from "@/lib/data/heroSlides"
import { useCarousel } from "@/hooks/useCarousel"

function HeroBannerSlider() {
  const { api, setApi, current, count, plugin } = useCarousel(5000)

  return (
    <section className="-mt-8 relative max-w-6xl mx-auto">
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
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index}>
              <Card className="p-0 rounded-none w-full border-none dark:bg-transparent">
                <CardContent className="p-0 min-h-110 relative grid place-items-center grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12">
                  <aside className="flex items-center text-center order-last md:order-first">
                    <section className="container mx-auto px-4 md:px-6 lg:px-8 max-w-xl lg:max-w-2xl">
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 dark:text-white">
                        {slide.title}
                      </h1>
                      <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8 dark:text-gray-200 lg:max-w-10/12 lg:mx-auto">
                        {slide.subtitle}
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="bg-primary dark:bg-secondary dark:text-white mb-2 dark:hover:bg-secondary/80"
                      >
                        <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                      </Button>
                    </section>
                  </aside>

                  <figure className="w-full h-full">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                      priority={index === 0}
                    />
                  </figure>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 border-none cursor-pointer hover:text-white" />
        <CarouselNext className="right-4 border-none cursor-pointer hover:text-white" />
      </Carousel>

      <div className="absolute flex justify-center gap-2.5 md:bottom-4 left-1/2 -translate-x-1/2 z-10">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`h-2.5 w-2.5 rounded-full transition-all cursor-pointer ${
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
