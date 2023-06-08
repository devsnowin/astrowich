export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    currency: 'inr',
    style: 'currency',
  }).format(amount);
}
