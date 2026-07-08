/** Formats a number as Korean won, e.g. 12500 -> "12,500원". */
export const formatPrice = (price: number): string =>
  `${price.toLocaleString('ko-KR')}원`
