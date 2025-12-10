"use client"

import { useState, useEffect, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { getProfile, updateProfile, uploadProfileImage } from "@/actions/users"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { useAuth } from "@/stores/useAuthStore"
import { toast } from "sonner"
import { Camera, Loader2, User as UserIcon } from "lucide-react"
import { useRouter } from "next/navigation"

const profileSchema = z.object({
  firstName: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  lastName: z.string().min(2, {
    message: "El apellido debe tener al menos 2 caracteres.",
  }),
  phone: z.string().optional().or(z.literal("")),
  nationalId: z.string().optional().or(z.literal("")),
  birthDate: z.string().optional().or(z.literal("")),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export function ProfileForm() {
  const { user: authUser, setUser } = useAuth()
  const [isPending, startTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(true)
  const [imageUploading, setImageUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const router = useRouter()

  // Determine the display image (preview > authUser image > session image > placeholder)
  const displayImage = previewImage || authUser?.profileImage || null

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      nationalId: "",
      birthDate: "",
    },
  })

  useEffect(() => {
    const loadProfile = async () => {
      try {
        startTransition(async () => {
          if (authUser) {
            const data = await getProfile()
            if (data) {
              form.reset({
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                phone: data.phone || "",
                nationalId: data.nationalId || "",
                birthDate: data.birthDate ? data.birthDate.split("T")[0] : "",
              })
              // Sync user store if needed
              if (authUser?.id !== data.id) {
                setUser(data)
              }
            }
          }
        })
      } catch (error) {
        console.error("Failed to load profile", error)
        toast.error("Error al cargar el perfil")
      } finally {
        setIsLoading(false)
      }
    }
    loadProfile()
  }, [authUser, form, setUser, authUser?.id])

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      startTransition(async () => {
        // Filter out empty strings if necessary, though the API likely handles them
        const res = await updateProfile(data)
        if (res && res.data) {
          setUser(res.data)
          toast.success("Perfil actualizado correctamente")
        } else {
          toast.error("Error al actualizar el perfil")
        }
      })
    } catch (error) {
      console.error("Failed to update profile", error)
      toast.error("Error al actualizar el perfil")
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    setPreviewImage(objectUrl)
    setImageUploading(true)

    try {
      const res = await uploadProfileImage(file)
      if (res && res.data) {
        setUser(res.data)
        router.refresh()
        toast.success("Imagen de perfil actualizada")
      }
    } catch (error) {
      console.error("Error uploading image", error)
      toast.error("Error al subir la imagen")
      setPreviewImage(null)
    } finally {
      setImageUploading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Información Personal</CardTitle>
        <CardDescription>
          Actualiza tus datos personales y tu foto de perfil.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-background shadow-lg bg-muted flex items-center justify-center">
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserIcon className="h-16 w-16 text-muted-foreground" />
                )}
                {imageUploading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                  </div>
                )}
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition shadow-md"
              >
                <Camera className="h-4 w-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={imageUploading}
                />
              </label>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Permitido JPG, GIF o PNG. Max 2MB.
            </p>
          </div>

          {/* Form Section */}
          <div className="flex-1">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu apellido" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nationalId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DNI / Documento</FormLabel>
                        <FormControl>
                          <Input placeholder="12345678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Nacimiento</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input placeholder="+54 9 11 ..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Email Field - Read Only */}
                  <div className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <Input
                      value={authUser?.email || ""}
                      disabled
                      className="bg-muted text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isPending}>
                    {isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isPending ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
