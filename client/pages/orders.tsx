import React from 'react';

import { Meta, MobileBottomMenu } from '@/components/core';
import WithAuth from '@/components/core/WithAuth';
import { OrderList } from '@/components/order';
import { Container, Heading } from '@/components/ui';

const Orders = () => {
  return (
    <>
      <Meta title="My Orders" />
      <Container>
        <Heading> My Orders </Heading>
        <OrderList />
      </Container>
      <MobileBottomMenu />
    </>
  );
};

export default WithAuth(Orders);
