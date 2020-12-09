import React from 'react';
import { GetServerSideProps } from 'next';
import { OrderList } from 'components/order';
import { ErrorMessage, Container, Heading } from 'components/ui';
import { Meta, MobileBottomMenu } from 'components/core';
import { Order as OrderType } from 'types';
import { OrderService } from 'services/orderService';

type Orders = OrderType[];

interface Props {
  orders: Orders;
  error: string;
}

const Order: React.FC<Props> = ({ orders, error }) => {
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <Meta title="My Orders" />
      <Container>
        <Heading> My Orders </Heading>
        <OrderList orders={orders} />
      </Container>
      <MobileBottomMenu />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let orders: Orders = [];
  const error: null | string = null;
  try {
    const result = await OrderService.fetchOrders();
    orders = result.orders;
  } catch (error) {
    return {
      props: {
        error: 'Error in getting your order. Please try again',
        orders: [],
      },
    };
  }

  return {
    props: { orders, error },
  };
};

export default Order;
