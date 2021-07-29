import WithAuth from '@/components/core/WithAuth';
import React from 'react';
import { WishlistItems } from '@/components/wishlist';
import { Container } from '@/components/ui';

const Wishlist = () => {
  return (
    <Container>
      <h1> My Wishlist</h1>
      <WishlistItems />
    </Container>
  );
};

export default WithAuth(Wishlist);
