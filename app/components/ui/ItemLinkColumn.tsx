import Link from "next/link"
import { ItemLinkColumnProps } from "@/types"

function ItemLinkColumn({ column }: ItemLinkColumnProps) {
  return (
    <div>
      <h3 className="text-secondary font-semibold text-lg mb-4">
        {column.title}
      </h3>
      <ul className="space-y-2">
        {column.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-gray-900 hover:text-green-700 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ItemLinkColumn
