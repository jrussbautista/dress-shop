const formatPrice = (price: number): string => {
  return `P${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

export default formatPrice;
