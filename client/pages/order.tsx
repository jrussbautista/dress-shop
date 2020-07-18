import React from 'react';
import { OrderList } from '../features/Order';

const Order = () => {
  return (
    <>
      <div className="container">
        <h1 className="page-title">Your Orders</h1>
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
