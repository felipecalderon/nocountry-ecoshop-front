import Link from "next/link"
import { Button } from "./components/ui/button"
import { SearchX, Home } from "lucide-react"
import { BackButton } from "./components/ui/BackButton"

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center px-4 mb-8 lg:mb-12">
      <article className="text-center space-y-4 max-w-md">
        <header className="flex flex-col">
          <SearchX className="h-20 w-20 text-muted-foreground dark:text-gray-200 mx-auto" />
          <h1 className="text-8xl font-bold text-muted-foreground dark:text-gray-200">
            404
          </h1>
        </header>

        <main className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight">
            Página no encontrada
          </h2>
          <p className="text-muted-foreground dark:text-gray-300">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </main>

        <footer className="flex flex-col sm:flex-row gap-3 justify-center pt-4 [&>button]:cursor-pointer">
          <Button
            asChild
            className="dark:text-primary dark:bg-secondary dark:hover:bg-secondary/80 dark:hover:text-primary/80"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Ir al inicio
            </Link>
          </Button>

          <BackButton />
        </footer>
      </article>
    </section>
  )
}
