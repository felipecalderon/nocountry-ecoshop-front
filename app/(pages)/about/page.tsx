import StorySection from "@/app/components/ui/StorySection"
import { storySections } from "@/lib/data/storySections"
import OurTeam from "@/app/components/ui/OurTeam"

export default function About() {
  return (
    <section className="container mx-auto px-4 pb-8">
      <article className="max-w-5xl mx-auto">
        <section className="space-y-24 py-12 xl:space-y-32">
          {storySections.map((section, index) => (
            <StorySection
              key={index}
              title={section.title}
              subtitle={section.subtitle}
              description={section.description}
              imageSrc={section.imageSrc}
              imageAlt={section.imageAlt}
              reverse={section.reverse}
            />
          ))}
        </section>
        <OurTeam />
      </article>
    </section>
  )
}
