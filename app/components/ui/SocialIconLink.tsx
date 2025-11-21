import { SocialIconLinkProps } from "@/types"

const SocialIconLink = ({
  href,
  IconComponent,
  label,
  hoverClass,
}: SocialIconLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-10 h-10 rounded-full bg-gray-700 ${hoverClass} transition-colors flex items-center justify-center`}
    aria-label={label}
  >
    <IconComponent className="w-5 h-5 text-white" />
  </a>
)

export default SocialIconLink
