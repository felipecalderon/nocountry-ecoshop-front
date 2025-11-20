import { useRef, useState, useEffect } from "react"
import Autoplay from "embla-carousel-autoplay"
import { type CarouselApi } from "@/app/components/ui/carousel"

export function useCarousel(delay: number = 5000) {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const plugin = useRef(
    Autoplay({
      delay,
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

  return {
    api,
    setApi,
    current,
    count,
    plugin,
  }
}
