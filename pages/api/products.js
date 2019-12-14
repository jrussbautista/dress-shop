import products from "../../public/products.json";

export default (req, res) => {
  res.json({ products });
};
