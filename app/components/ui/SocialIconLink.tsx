import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip"
import { SocialIconLinkProps } from "@/types"

const SocialIconLink = ({
  href,
  IconComponent,
  label,
  hoverClass,
}: SocialIconLinkProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`
              w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center
              transition-colors ${hoverClass}
            `}
        >
          <IconComponent className="w-5 h-5 text-white" />
        </a>
      </TooltipTrigger>

      <TooltipContent side="top">
        <p className="text-xs">{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default SocialIconLink

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/app/components/ui/tooltip"
// import { SocialIconLinkProps } from "@/types"

// const SocialIconLink = ({
//   href,
//   IconComponent,
//   label,
//   hoverClass,
// }: SocialIconLinkProps) => (
//   <a
//     href={href}
//     target="_blank"
//     rel="noopener noreferrer"
//     className={`w-10 h-10 rounded-full bg-gray-700 ${hoverClass} transition-colors flex items-center justify-center`}
//     aria-label={label}
//   >
//     <TooltipProvider>
//       <Tooltip aria-label="Tooltip">
//         <TooltipTrigger aria-label="Tooltip trigger">
//           <IconComponent className="w-5 h-5 text-white" />
//         </TooltipTrigger>
//         <TooltipContent>
//           <p className="text-xs">{label}</p>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   </a>
// )

// export default SocialIconLink
