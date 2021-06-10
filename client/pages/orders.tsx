import React, { useEffect, useState } from 'react';
import { OrderList } from 'components/order';
import { ErrorMessage, Container, Heading } from 'components/ui';
import { Meta, MobileBottomMenu } from 'components/core';
import { Order as OrderType } from 'types';
import { OrderService } from 'services/orderService';
import WithAuth from 'components/core/WithAuth';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [ordersStatus, setOrdersStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setOrdersStatus('loading');
        const results = await OrderService.getOrders();
        setOrders(results);
        setOrdersStatus('succeeded');
      } catch (error) {
        setError(error.message);
        setOrdersStatus('failure');
      }
    };
    fetchOrders();
  }, []);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <Meta title="My Orders" />
      <Container>
        <Heading> My Orders </Heading>
        {ordersStatus === 'succeeded' && <OrderList orders={orders} />}
      </Container>
      <MobileBottomMenu />
    </>
  );
};

export default WithAuth(Orders);
