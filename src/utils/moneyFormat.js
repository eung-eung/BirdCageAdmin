const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
export default function formatMoney(money) {
  return formatter.format(money);
}
