import { useRef, useState } from 'react'
import { ChevronDownIcon } from './icons'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { cn } from '@/utils/cn'

export interface SelectOption<T extends string> {
  value: T
  label: string
}

interface SelectProps<T extends string> {
  value: T
  options: SelectOption<T>[]
  onChange: (value: T) => void
  className?: string
  ariaLabel?: string
}

/**
 * 공통 셀렉트 (언더라인 스타일).
 * 현재 값은 트리거에 굵게 표시하고, 드롭다운에는 나머지 옵션만 노출합니다(Figma).
 */
export const Select = <T extends string>({
  value,
  options,
  onChange,
  className,
  ariaLabel,
}: SelectProps<T>) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => setOpen(false))

  const currentLabel = options.find((option) => option.value === value)?.label
  const others = options.filter((option) => option.value !== value)

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        className="flex w-full items-center justify-between gap-2 border-b border-palette-gray pb-2 text-body2 font-bold text-text-primary"
      >
        {currentLabel}
        <ChevronDownIcon
          className={cn(
            'shrink-0 text-text-subtitle transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && others.length > 0 && (
        <ul
          role="listbox"
          className="absolute top-[calc(100%+8px)] left-0 z-10 min-w-full overflow-hidden rounded border border-palette-lightgray bg-white py-1 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          {others.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={false}
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className="block w-full px-3 py-2 text-left text-body2 whitespace-nowrap text-text-subtitle hover:bg-palette-lightgray"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
