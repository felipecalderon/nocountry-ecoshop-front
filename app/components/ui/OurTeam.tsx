import TeamCard from "./TeamCard"
import { TooltipProvider } from "./tooltip"
import { teamMembers } from "@/lib/data/teamMembers"

function OurTeam() {
  return (
    <section className="pt-12">
      <header className="text-center mb-4">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">
          Nuestro Equipo
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-200">
          Profesionales colaborando desde diferentes áreas para dar vida al
          proyecto
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-8 mx-auto">
        <TooltipProvider>
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </TooltipProvider>
      </section>
    </section>
  )
}

export default OurTeam
