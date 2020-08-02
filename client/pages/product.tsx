import Router from 'next/router';
import React, { useState } from 'react';
import { ProductInfo, ProductRecommended } from 'components/domain/Product';
import { PopUp, Meta, MobileBottomMenu, InputQuantity } from 'components/shared';
import { usePopUp } from 'hooks';
import { useAuth, useCart, useToast } from 'store';
import { Product as ProductTypes, AddCart } from 'types';
import { GetServerSideProps } from 'next';
import { ProductService } from 'services/productService';
import { CartService } from 'services';
import { parseCookies } from 'nookies';
import { ErrorPage, Button } from 'components/shared';

interface Props {
  product: ProductTypes;
  relatedProducts: ProductTypes[];
  error?: string;
}

const Product: React.FC<Props> = ({ product, relatedProducts, error }) => {
  const [qty, setQty] = useState<string | number>(1);
  const { addCart } = useCart();
  const { currentUser } = useAuth();
  const { isOpen, showToast } = usePopUp();
  const { setToast } = useToast();

  const handleChangeInputQty = (value: string | number) => {
    if (Number(value) > 10) {
      setToast('error', 'Ops up to 10 max only');
      setQty(10);
      return;
    }
    setQty(value);
  };

  // handle change quantity
  const handleButtonChangeQty = (action: string) => {
    if (action === 'add') {
      if (qty >= 10) {
        setToast('error', 'Ops you can add to cart up to 10 max only');
        return;
      }
      setQty((qty) => Number(qty) + 1);
    } else {
      if (qty > 1) setQty((qty) => Number(qty) - 1);
    }
  };

  //handle add to cart
  const handleAddToCart = async () => {
    try {
      if (!currentUser) {
        setToast('error', 'Please log in first');
        Router.push(`/auth?type=login&ref=${product._id}`);
        return;
      }

      const cartObj: AddCart = { quantity: Number(qty), product };
      const { token } = parseCookies({});
      showToast();
      addCart(cartObj);
      await CartService.addCart(token, Number(qty), product._id);
    } catch (error) {
      setToast('error', error.message);
    }
  };

  const handleChangeBlur = (val: string) => {
    if (!val) {
      setQty(1);
    }
  };

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <>
      <Meta title={product.name} />
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
            <div className="product-action">
              <InputQuantity
                value={qty}
                onButtonClick={handleButtonChangeQty}
                onChangeBlur={handleChangeBlur}
                onChangeInput={handleChangeInputQty}
              />
              <Button
                type="button"
                onClick={handleAddToCart}
                variant="primary"
                title="Add to Cart"
                style={{ borderRadius: '50px', width: '20rem', marginLeft: 20 }}
              />
            </div>
          </div>
        </div>
        <ProductRecommended products={relatedProducts} />
        <MobileBottomMenu />
      </div>
      <style jsx>{`
        .container {
          max-width: 120rem;
          margin: 0 auto;
        }

        .product-container {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .main,
        .product-info {
          flex-basis: 100%;
        }

        .product-info {
          padding: 2rem;
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
          object-fit: cover;
        }

        .product-action {
          display: flex;
          align-items: center;
          margin: 1rem 0;
        }

        @media only screen and (min-width: 1024px) {
          .main,
          .product-info {
            flex-basis: 50%;
            margin-bottom: 2rem;
            padding: 0 2rem;
          }

          .container {
            margin: 3rem auto;
          }
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
