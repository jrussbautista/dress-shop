import Router from 'next/router';
import React, { useState } from 'react';
import {
  ProductAction,
  ProductInfo,
  ProductRecommended,
} from '../features/Product';
import { PopUp } from '../shared';
import { useToast } from '../hooks';
import { useAuth, useCart } from '../store';
import { Product as ProductTypes, Cart, AddCart } from '../types';
import { GetServerSideProps } from 'next';
import { ProductService } from '../services/productService';
import { CartService } from '../services';
import { parseCookies } from 'nookies';
import { ErrorPage } from '../shared/ErrorPage';

interface Props {
  product: ProductTypes;
  relatedProducts: ProductTypes[];
  error?: string;
}

const Product: React.FC<Props> = ({ product, relatedProducts, error }) => {
  const [qty, setQty] = useState(1);
  const { addCart } = useCart();
  const { currentUser } = useAuth();
  const { isOpen, showToast } = useToast();

  // handle change quantity
  const handleChangeQty = (action: string) => {
    if (action === 'add') {
      if (qty >= 10) {
        alert('Ops you can buy up to 10 max');
        return;
      }
      setQty((qty) => qty + 1);
    } else {
      if (qty > 1) setQty((qty) => qty - 1);
    }
  };

  //handle add to cart
  const handleAddToCart = async () => {
    try {
      if (currentUser) {
        const cartObj: AddCart = { quantity: qty, product };
        const { token } = parseCookies({});
        addCart(cartObj);
        await CartService.addCart(token, qty, product._id);
        showToast();
      } else {
        Router.push(`/login?ref=${product._id}`);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <>
      <div className="container">
        <PopUp isOpen={isOpen} message={`Successfully added to cart`} />
        <div className="product-container">
          <div className="main">
            <div className="cover-img">
              <img className="img" src={product.imageURL} alt={product.name} />
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
        <ProductRecommended products={relatedProducts} />
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

        @media only screen and (max-width: 768px) {
          .main,
          .product-info {
            flex-basis: 100%;
            margin-bottom: 2rem;
          }
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string;

  try {
    const { product, relatedProducts } = await ProductService.fetchProduct(id);
    return {
      props: { product, relatedProducts },
    };
  } catch (error) {
    return {
      props: {
        product: null,
        relatedProducts: [],
        error: 'Error in getting product',
      },
    };
  }
};

export default Product;
