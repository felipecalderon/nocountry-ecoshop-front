"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import HeroBannerImg1 from "../../../public/images/hero-banner1.jpg"
import HeroBannerImg2 from "../../../public/images/hero-banner2.jpg"
import HeroBannerImg3 from "../../../public/images/hero-banner3.jpg"
import HeroBannerImg4 from "../../../public/images/hero-banner4.jpg"
import HeroBannerImg5 from "../../../public/images/hero-banner5.jpg"

const images = [
  HeroBannerImg1,
  HeroBannerImg2,
  HeroBannerImg3,
  HeroBannerImg4,
  HeroBannerImg5,
]

function HeroBannerSlider() {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const plugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
    })
  )

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="max-w-5xl mx-auto relative">
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
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Link key={index} href="/products">
                <Card className="bg-red-200 p-0 rounded-none w-full">
                  <CardContent className="p-0">
                    <Image
                      src={image}
                      alt="EcoShop"
                      width={400}
                      height={400}
                      className="max-h-120 w-full object-cover"
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
