export const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase();
};

export const getCurrency = (price: number) => {
  return `P${price}`;
};
