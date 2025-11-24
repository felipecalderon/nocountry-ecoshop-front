import { StaticImageData } from "next/image"

export interface IconProps {
  className?: string
}

export interface SocialIconLinkProps {
  href: string
  IconComponent: React.FC<IconProps>
  label: string
  hoverClass: string
}

export interface SectionLink {
  href: string
  label: string
}

export interface SectionColumn {
  title: string
  links: SectionLink[]
}

export interface ItemLinkColumnProps {
  column: SectionColumn
}

export interface HeroSlide {
  image: StaticImageData
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
}

export interface FeatureItemProps {
  id?: number
  icon: React.ReactNode
  title: string
  description: string
}
