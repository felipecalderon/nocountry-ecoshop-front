"use client"

import { Mail } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useNewsletterForm } from "@/hooks/useNewsletterForm"
import { NewsletterFormProps } from "@/types"

function NewsletterForm({ className }: NewsletterFormProps) {
  const { email, setEmail, isSubmitting, handleSubmit } = useNewsletterForm()

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="relative flex-1 border border-gray-300 rounded-full sm:border-none">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 h-12 rounded-full border-none"
          required
          autoComplete="off"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 px-8 rounded-full cursor-pointer"
        size="lg"
      >
        {isSubmitting ? "Suscribiendo..." : "Suscribirse"}
      </Button>
    </form>
  )
}

export default NewsletterForm
