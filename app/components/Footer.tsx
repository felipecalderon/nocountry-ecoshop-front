import Image from "next/image"
import SocialIconLink from "./ui/SocialIconLink"
import ItemLinkColumn from "./ui/ItemLinkColumn"
import { footerColumns } from "@/lib/data/footerLinks"
import { socialIconLinks } from "@/lib/data/socials"

function Footer() {
  return (
    <footer
      className="bg-[url('/images/footer-background.avif')] bg-cover lg:bg-contain bg-no-repeat bg-bottom"
      id="footer"
    >
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <figure className="w-28 h-28 mb-8 rounded-full shadow-lg overflow-hidden mx-auto">
          <Image
            src="/images/ecoshop-logo.avif"
            alt="Ecoshop Logo"
            width={400}
            height={400}
            className="w-full object-cover"
          />
        </figure>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 my-4">
          {footerColumns.map((column) => (
            <ItemLinkColumn key={column.title} column={column} />
          ))}

          <div className="hidden sm:block">
            <h3 className="text-secondary font-semibold text-lg mb-4">
              Formas de Pago
            </h3>
            <figure>
              <Image
                src="/images/payment-methods.avif"
                alt="Formas de Pago"
                width={800}
                height={454}
                className="w-full object-cover max-w-80"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6 border-t border-stone-400">
        <article className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm font-medium">
            © 2025 Ecoshop. Todos los derechos reservados.
          </p>

          <aside className="flex gap-3">
            {socialIconLinks.map(
              ({ href, IconComponent, label, hoverClass }) => (
                <SocialIconLink
                  key={label}
                  href={href}
                  IconComponent={IconComponent}
                  label={label}
                  hoverClass={hoverClass}
                />
              )
            )}
          </aside>
        </article>
      </section>
    </footer>
  )
}

export default Footer
