import React from 'react';

import WithAuth from '@/components/core/WithAuth';
import { Container } from '@/components/ui';
import { WishlistItems } from '@/components/wishlist';

const Wishlist = () => {
  return (
    <Container>
      <h1> My Wishlist</h1>
      <WishlistItems />
    </Container>
  );
};

export default WithAuth(Wishlist);
