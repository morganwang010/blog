'use client'
import { useState } from "react";
import { ChangeEvent } from "react";
import NavCard, { NavSiteItem } from "@/components/NavCard";

interface CategoryItem {
  name: string
  key: string
}

interface NavData {
  categories: CategoryItem[]
  websites: Array<{
    id: number
    name: string
    url: string
    desc: string
    category: string
    logo?: string
  }>
}

interface Props {
  initialData: NavData
}

function SearchInput({value, onChange}:{value:string, onChange:(e:ChangeEvent<HTMLInputElement>)=>void}) {
  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <input
        type="text"
        placeholder="搜索网站名称/描述..."
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
      />
    </div>
  )
}

function CategoryTab({list, activeKey, onChange}:{list:CategoryItem[], activeKey:string, onChange:(key:string)=>void}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      {list.map(item=>(
        <button
          key={item.key}
          onClick={()=>onChange(item.key)}
          className={`px-4 py-2 rounded-full text-sm transition-all ${
            activeKey === item.key 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-50 hover:bg-blue-50 text-gray-600'
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
}

export default function WebsiteClient({ initialData }: Props) {
  const [activeCat, setActiveCat] = useState('all');
  const [searchKey, setSearchKey] = useState('');

  const filterList:NavSiteItem[] = initialData.websites.filter(item=>{
    const catMatch = activeCat === 'all' || item.category === activeCat;
    const searchMatch = item.name.toLowerCase().includes(searchKey.toLowerCase()) 
      || item.desc.toLowerCase().includes(searchKey.toLowerCase());
    return catMatch && searchMatch;
  })

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">实用网址导航</h1>
      <p className="text-center text-gray-500 mb-10">
        极简分类 · 高效聚合常用站点
      </p>

      <SearchInput 
        value={searchKey}
        onChange={(e)=>setSearchKey(e.target.value)}
      />

      <CategoryTab 
        list={initialData.categories}
        activeKey={activeCat}
        onChange={setActiveCat}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filterList.length > 0 ? (
          filterList.map(site=>(
            <NavCard key={site.id} item={site} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400">
            暂无匹配站点
          </div>
        )}
      </div>
    </main>
  )
}