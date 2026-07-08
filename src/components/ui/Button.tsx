import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:brightness-95',
  secondary: 'bg-palette-lightgray text-text-secondary hover:brightness-95',
  outline:
    'border border-palette-gray bg-white text-text-secondary hover:bg-palette-lightgray',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'h-[35px] gap-1 px-3 text-body2',
  md: 'h-12 gap-1 px-4 text-caption',
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={cn(
      'inline-flex items-center justify-center rounded-lg font-medium whitespace-nowrap transition disabled:cursor-not-allowed disabled:opacity-50',
      variantClass[variant],
      sizeClass[size],
      className,
    )}
    {...props}
  />
)
