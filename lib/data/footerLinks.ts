export const footerColumns = [
  {
    title: "Ecoshop",
    links: [
      { href: "/about", label: "Acerca de" },
      { href: "/store", label: "Productos" },
      { href: "/favorites", label: "Favoritos" },
      { href: "/cart", label: "Carrito" },
    ],
  },
  {
    title: "Productos",
    links: [
      {
        href: "/store?recyclabilityStatus=FULLY_RECYCLABLE",
        label: "Reciclables",
      },
      {
        href: "/store?recyclabilityStatus=PARTIALLY_RECYCLABLE",
        label: "Parcialmente Reciclables",
      },
      { href: "/store?ecoBadgeLevel=LOW", label: "Bajo Impacto" },
      {
        href: "/store?ecoBadgeLevel=MEDIUM",
        label: "Medio Impacto",
      },
    ],
  },
  {
    title: "Soporte",
    links: [
      { href: "/shipping", label: "Envío" },
      { href: "/returns", label: "Devoluciones" },
      { href: "/privacy", label: "Política de Privacidad" },
      { href: "/terms", label: "Términos de uso" },
    ],
  },
]
