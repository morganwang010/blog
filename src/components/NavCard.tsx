import Link from "next/link"

export interface NavSiteItem {
  id: number
  name: string
  url: string
  desc: string
  logo?: string
}

export default function NavCard({item}:{item:NavSiteItem}) {
  return (
    <Link 
      href={item.url} 
      target="_blank"
      className="block p-4 bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100"
    >
      <div className="flex items-center gap-3">
        {item.logo && (
          <img 
            src={item.logo} 
            alt={item.name}
            className="w-10 h-10 rounded object-contain shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate text-gray-800">{item.name}</h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
            {item.desc}
          </p>
        </div>
      </div>
    </Link>
  )
}