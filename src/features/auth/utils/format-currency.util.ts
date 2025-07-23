export function formatCurrency(value: number | string) {
  const numberValue = typeof value === 'string' ? parseFloat(value) : value
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(numberValue)
}
