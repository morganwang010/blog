'use client'
import { ChangeEvent } from "react"

interface Props {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function SearchInput({value, onChange}:Props) {
  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <input
        type="text"
        placeholder="搜索网站名称/描述..."
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
    </div>
  )
}