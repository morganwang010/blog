'use client'
interface CategoryItem {
  name: string
  key: string
}

interface Props {
  list: CategoryItem[]
  activeKey: string
  onChange: (key:string) => void
}

export default function CategoryTab({list, activeKey, onChange}:Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      {list.map(item=>(
        <button
          key={item.key}
          onClick={()=>onChange(item.key)}
          className={`px-4 py-2 rounded-full text-sm transition-all ${
            activeKey === item.key 
              ? 'bg-blue-600 text-white' 
              : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
}