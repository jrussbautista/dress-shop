import { Banner, Product, Category } from '../src/models';

const fs = require('fs');

const banners = JSON.parse(
  fs.readFileSync(`${__dirname}/data/banners.json`, 'utf-8')
);

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/data/products.json`, 'utf-8')
);

const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/data/categories.json`, 'utf-8')
);

const seed = async () => {
  await Banner.create(banners);
  await Product.create(products);
  await Category.create(categories);
};

seed();
