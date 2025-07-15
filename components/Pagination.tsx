'use client'
import { cn } from '@/lib/utils'

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="mt-8 flex justify-center gap-2 flex-wrap">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            'px-4 py-2 rounded border text-sm font-medium',
            currentPage === page
              ? 'bg-yellow-500 text-black border-yellow-500'
              : 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
          )}
        >
          {page}
        </button>
      ))}
    </div>
  )
}
