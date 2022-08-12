import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import Router from 'next/router';
import React, { useState } from 'react';

import { Meta, MobileBottomMenu } from '@/components/core';
import { ProductList, ProductInputQuantity } from '@/components/product';
import { PopUp, Container, Heading, ErrorMessage, Button } from '@/components/ui';
import WishlistButton from '@/components/wishlist/WishlistButton';
import { useToast } from '@/contexts';
import { usePopUp } from '@/hooks';
import useAddItem from '@/hooks/cart/use-add-item';
import useUser from '@/hooks/user/use-user';
import { ProductService } from '@/services/ProductService';
import styles from '@/styles/Product.module.css';
import { Product as ProductTypes } from '@/types';
import { CACHE_REVALIDATION } from '@/utils/constants';
import formatPrice from '@/utils/formatPrice';

interface Props {
  product: ProductTypes;
  relatedProducts: ProductTypes[];
  error?: string;
}

const Product = ({ product, relatedProducts, error }: Props) => {
  const [qty, setQty] = useState<string | number>(1);
  const { addToCart, addingToCart } = useAddItem();
  const { data: currentUser } = useUser();
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
        return Router.push(`/login?ref=${product._id}`);
      }
      await addToCart(product._id, Number(qty));
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
      <Meta title={product.name} description={product.description} image={product.imageURL} />
      <Container>
        <PopUp isOpen={isOpen} message={`Successfully added to cart`} />
        <div className={styles.productContainer}>
          <div className={styles.main}>
            <div className={styles.coverImg}>
              <Image
                className={styles.img}
                layout="fill"
                src={product.imageURL}
                alt={product.name}
              />
            </div>
          </div>
          <div className={styles.productInfo}>
            <div className={styles.productTopContainer}>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.wishlistButtonContainer}>
                <WishlistButton productId={product._id} />
              </div>
            </div>
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
                disabled={addingToCart}
                loading={addingToCart}
              />
            </div>
          </div>
        </div>
        <Heading> Related Products </Heading>
        <ProductList products={relatedProducts} />
      </Container>
      <MobileBottomMenu />
    </>
  );
};

export async function getStaticProps({ params }: GetStaticPropsContext<{ id: string }>) {
  const id = params?.id as string;

  try {
    const { product, relatedProducts } = await ProductService.getProduct(id);
    return {
      props: { product, relatedProducts },
      revalidate: CACHE_REVALIDATION,
    };
  } catch (error) {
    return {
      props: {
        product: null,
        relatedProducts: [],
        error: 'Unexpected error occured. Please try again later.',
      },
    };
  }
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export default Product;
