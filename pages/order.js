import React from 'react';
import Layout from '../components/Layout';
import OrderList from '../components/Order/OrderList';

const Order = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default Order;
