import React from 'react';
import { OrderList } from '../features/Order';
import { Meta } from '../shared';

const Order = () => {
  return (
    <>
      <Meta title="My Orders" />
      <div className="container">
        <h1 className="page-title">My Orders</h1>
        <OrderList />
      </div>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 2rem;
        }
        .page-title {
          font-size: 3rem;
        }
      `}</style>
    </>
  );
};

export default Order;
