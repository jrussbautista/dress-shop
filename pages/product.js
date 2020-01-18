import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../store/cart/cart.context';
import Layout from '../components/Layout';
import axios from 'axios';
import baseURL from '../utils/baseURL';
import ProductAction from '../components/Product/ProductAction';
import ProductInfo from '../components/Product/ProductInfo';
import SkeletonProduct from '../components/Shared/Loader/SkeletonProduct';
import Recommended from '../components/Product/Recommended';

const Product = () => {
  const { id } = useRouter().query;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const { addCart } = useCart();

  useEffect(() => {
    async function getProductInfo() {
      const payload = { params: { id } };
      const { data } = await axios.get(`${baseURL}/api/product`, payload);
      console.log(data);
      setProduct(data.product);
      setRelatedProducts(data.relatedProducts);
      setLoading(false);
    }
    getProductInfo();
  }, [id]);

  // handle change quantity
  const handleChangeQty = action => {
    if (action === 'add') {
      setQty(qty => qty + 1);
    } else {
      if (qty > 1) setQty(qty => qty - 1);
    }
  };

  //handle add to cart
  const handleAddToCart = () => {
    const cartObj = { quantity: qty, product };
    addCart(cartObj);
  };

  return (
    <Layout>
      <div className="container">
        {loading ? (
          <SkeletonProduct />
        ) : (
          <>
            <div className="product-container">
              <div className="main">
                <div className="cover-img">
                  <img className="img" src={product.imageURL} alt="" />
                </div>
              </div>
              <div className="product-info">
                <ProductInfo product={product} />
                <ProductAction
                  handleQty={handleChangeQty}
                  qty={qty}
                  handleAddToCart={handleAddToCart}
                />
              </div>
            </div>
            <Recommended products={relatedProducts} />
          </>
        )}
      </div>
      <style jsx>{`
        .container {
          max-width: 120rem;
          margin: 3rem auto;
        }
        .product-container {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .main,
        .product-info {
          flex-basis: 50%;
        }

        .cover-img {
          position: relative;
          padding-bottom: 100%;
        }

        .img {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          object-fit: contain;
        }
      `}</style>
    </Layout>
  );
};

export default Product;
