import Image from "next/image"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { LinkedInIcon, GitHubIcon } from "../icons"

interface TeamMember {
  name: string
  role: string
  image: string
  linkedin: string
  github?: string
}

const TeamCard = ({ member }: { member: TeamMember }) => {
  return (
    <Card className="overflow-hidden border-0 shadow-none bg-transparent">
      <CardHeader className="p-0">
        <div className="relative">
          <figure className="w-10/12 h-full xl:h-56 lg:w-full rounded-lg overflow-hidden shadow-xl mx-auto">
            <Image
              src={member.image}
              alt={member.name}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
            {member.linkedin && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size="icon"
                    className="w-12 h-12 rounded-full text-gray-900 shadow-md dark:text-black hover:bg-opacity-100 dark:hover:bg-opacity-100"
                  >
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn de ${member.name}`}
                    >
                      <LinkedInIcon />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ver LinkedIn</p>
                </TooltipContent>
              </Tooltip>
            )}

            {member.github && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size="icon"
                    className="w-12 h-12 rounded-full text-gray-900 shadow-md dark:text-black hover:bg-opacity-100 dark:hover:bg-opacity-100"
                  >
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub de ${member.name}`}
                    >
                      <GitHubIcon />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ver GitHub</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {member.name}
        </h3>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
          {member.role}
        </p>
      </CardContent>
    </Card>
  )
}

export default TeamCard
