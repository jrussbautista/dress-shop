import Router from 'next/router';
import React, { useState } from 'react';
import { PopUp, Container, Heading } from 'components/ui';
import { Meta, MobileBottomMenu } from 'components/core';
import { ProductList, ProductInputQuantity } from 'components/product';
import { usePopUp } from 'hooks';
import { useAuth, useCart, useToast } from 'contexts';
import { Product as ProductTypes } from 'types';
import { GetServerSideProps } from 'next';
import { ProductService } from 'services/productService';
import { ErrorMessage, Button } from 'components/ui';
import styles from 'styles/Product.module.css';
import formatPrice from 'utils/formatPrice';

interface Props {
  product: ProductTypes;
  relatedProducts: ProductTypes[];
  error?: string;
}

const Product: React.FC<Props> = ({ product, relatedProducts, error }) => {
  const [qty, setQty] = useState<string | number>(1);
  const { addCartItem } = useCart();
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

  const handleAddToCart = async () => {
    try {
      if (!currentUser) {
        setToast('error', 'Please log in first');
        Router.push(`/auth?type=login&ref=${product._id}`);
        return;
      }
      await addCartItem(product, Number(qty));
      showToast();
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
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <Meta title={product.name} />
      <Container>
        <PopUp isOpen={isOpen} message={`Successfully added to cart`} />
        <div className={styles.productContainer}>
          <div className={styles.main}>
            <div className={styles.coverImg}>
              <img className={styles.img} src={product.imageURL} alt={product.name} />
            </div>
          </div>
          <div className={styles.productInfo}>
            <div className={styles.productName}>{product.name}</div>
            <div className={styles.productPrice}>{formatPrice(product.price)}</div>
            <div className={styles.productDesc}>{product.description}</div>
            <div className={styles.productAction}>
              <ProductInputQuantity
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
                className={styles.btnAddCart}
              />
            </div>
          </div>
        </div>
        <Heading className={styles.heading}> Related Products </Heading>
        <ProductList products={relatedProducts} />
      </Container>
      <MobileBottomMenu />
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
