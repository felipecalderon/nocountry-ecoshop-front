"use client"

import { useState, useEffect, useTransition } from "react"
import { getProfile, updateProfile } from "@/actions/users"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { useAuth } from "@/stores/useAuthStore"
import { useUser } from "@auth0/nextjs-auth0/client"

export function ProfileForm() {
  const { user: sessionUser } = useUser()
  const { setUser } = useAuth()
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  })

  useEffect(() => {
    const loadProfile = async () => {
      try {
        startTransition(async () => {
          if (sessionUser) {
            const data = await getProfile()
            if (data) {
              setFormData({
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                phone: data.phone || "",
              })
            }
          }
        })
      } catch (error) {
        console.error("Failed to load profile", error)
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [sessionUser])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const updatedUser = await updateProfile(formData)
      if (updatedUser) {
        setUser(updatedUser.data)
        alert("Profile updated successfully!")
      }
    } catch (error) {
      console.error("Failed to update profile", error)
      alert("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  if (loading || isPending) {
    return <div>Cargando...</div>
  }

  return (
    <Card className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nombre</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Apellido</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1234567890"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={saving} className="mt-6">
            {saving ? "Guardando..." : "Guardar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
