import React from "react"
import Image from "next/image"

interface StorySectionProps {
  title: string
  subtitle: string
  description: string
  imageSrc: string
  imageAlt: string
  reverse?: boolean
}

const StorySection: React.FC<StorySectionProps> = ({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
}) => {
  return (
    <article
      className={`flex flex-col ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } gap-8 lg:gap-12 items-center max-w-7xl mx-auto px-4`}
    >
      <figure className="w-full h-full lg:w-1/2 overflow-hidden border-none shadow-xl rounded-lg">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={626}
          height={418}
          loading="eager"
          className="h-full w-full object-cover"
        />
      </figure>

      <section className="w-full lg:w-1/2 space-y-4">
        <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
          {title}
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
          {subtitle}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed dark:text-gray-300">
          {description}
        </p>
      </section>
    </article>
  )
}

export default StorySection
