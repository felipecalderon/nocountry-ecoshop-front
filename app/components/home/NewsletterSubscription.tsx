import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import NewsletterForm from "./NewsletterForm"

function NewsletterSubscription() {
  return (
    <section className="relative bg-[url('/images/newsletter-background.webp')] bg-cover w-full h-96 lg:min-h-[calc(100vh-2rem)] flex items-center lg:items-end justify-start px-8 md:px-16 lg:px-24">
      <div className="absolute inset-0 bg-black/10"></div>
      <article className="w-full max-w-6xl">
        <Card className="relative z-10 w-full lg:min-w-xl md:max-w-xl border-0 shadow-2xl bg-white/95 backdrop-blur-sm lg:mb-10">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              Suscríbete a nuestro newsletter
            </CardTitle>
            <CardDescription className="text-base md:text-lg text-muted-foreground">
              Sé el primero en conocer ofertas exclusivas, eco-consejos y nuevos
              lanzamientos!
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <NewsletterForm className="flex flex-col sm:flex-row gap-3 sm:border sm:border-gray-300 rounded-full p-1" />

            <p className="text-xs text-muted-foreground">
              Puedes darte de baja en cualquier momento.
            </p>
          </CardContent>
        </Card>
      </article>
    </section>
  )
}

export default NewsletterSubscription
