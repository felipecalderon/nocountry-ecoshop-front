import { useState } from "react"
import { toast } from "sonner"

export function useNewsletterForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Por favor, ingresa un email válido")
      return
    }

    setIsSubmitting(true)

    toast.success(`Gracias por tu suscripción ${email}!`)
    setEmail("")
    setIsSubmitting(false)
  }

  return {
    email,
    setEmail,
    isSubmitting,
    handleSubmit,
  }
}
