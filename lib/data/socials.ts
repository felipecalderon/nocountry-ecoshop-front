import {
  WhatsAppIcon,
  TikTokIcon,
  InstagramIcon,
  FacebookIcon,
} from "@/app/components/icons"

export const socialIconLinks = [
  {
    href: "https://wa.me/",
    IconComponent: WhatsAppIcon,
    label: "WhatsApp",
    hoverClass: "hover:bg-green-600",
  },
  {
    href: "https://tiktok.com/",
    IconComponent: TikTokIcon,
    label: "TikTok",
    hoverClass: "hover:bg-gray-900",
  },
  {
    href: "https://instagram.com/",
    IconComponent: InstagramIcon,
    label: "Instagram",
    hoverClass: "hover:bg-pink-600",
  },
  {
    href: "https://facebook.com/",
    IconComponent: FacebookIcon,
    label: "Facebook",
    hoverClass: "hover:bg-blue-600",
  },
]
