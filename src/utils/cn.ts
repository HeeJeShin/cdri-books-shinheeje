type ClassValue = string | number | false | null | undefined

/**
 * Joins truthy class names into a single string.
 * Lightweight alternative to clsx for conditional Tailwind classes.
 */
export const cn = (...values: ClassValue[]): string =>
  values.filter(Boolean).join(' ')
