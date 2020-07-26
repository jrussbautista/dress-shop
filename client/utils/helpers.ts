export const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase();
};

export const getCurrency = (price: number) => {
  return `P${price}`;
};

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US');
};
