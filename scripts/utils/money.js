export function formatCurrency(itemPrice){
  return (itemPrice / 100).toFixed(2);
}

export default formatCurrency;