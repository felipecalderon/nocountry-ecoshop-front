import { homeFeatures } from "@/lib/data/homeFeatures"
import FeatureItem from "./FeatureItem"

function WhyChooseUs() {
  return (
    <section className="w-full bg-gray-50 py-16 lg:py-24 px-4">
      <article className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-secondary lg:font-medium text-center mb-10">
          ¿Por qué somos tu mejor opción?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
          {homeFeatures.map((feature) => (
            <FeatureItem
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </article>
    </section>
  )
}

export default WhyChooseUs
