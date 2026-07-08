import type { SVGProps } from 'react'

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
    {...props}
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" strokeLinecap="round" />
  </svg>
)

export const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

interface HeartIconProps extends SVGProps<SVGSVGElement> {
  filled?: boolean
}

export const HeartIcon = ({ filled = false, ...props }: HeartIconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 21s-7.5-4.9-10-9.2C.6 9 1.6 5.5 4.7 4.6c2-.6 3.9.3 5 1.9l.3.4.3-.4c1.1-1.6 3-2.5 5-1.9 3.1.9 4.1 4.4 2.7 7.2C19.5 16.1 12 21 12 21Z" />
  </svg>
)

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)
