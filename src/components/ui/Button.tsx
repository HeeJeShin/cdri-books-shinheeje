import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:brightness-95',
  secondary: 'bg-palette-lightgray text-text-secondary hover:brightness-95',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-12 px-6 text-base',
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition disabled:cursor-not-allowed disabled:opacity-50',
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    />
  )
}
