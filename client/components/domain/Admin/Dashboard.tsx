import React from 'react';

export const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="welcome-title">
        Welcome back, <span>Admin</span>
      </div>
      <div className="list">
        <div className="item success">
          <div className="value">20</div>
          <div className="title">Products</div>
        </div>
        <div className="item info">
          <div className="value">40</div>
          <div className="title">Users</div>
        </div>
        <div className="item">
          <div className="value">20</div>
          <div className="title">Orders</div>
        </div>
      </div>
      <style jsx>
        {`
          .list {
            display: flex;
            align-items: center;
          }

          .item {
            width: 20rem;
            padding: 2rem;
            background-color: var(--color-primary);
            color: #fff;
            margin-right: 2rem;
            border-radius: 6px;
            text-align: center;
          }

          .value {
            font-size: 3rem;
          }

          .title {
            font-size: 2rem;
          }

          .welcome-title {
            font-size: 2rem;
            margin-bottom: 2rem;
          }

          .welcome-title span {
            font-weight: 600;
          }

          .success {
            background-color: var(--color-success);
          }

          .info {
            background-color: var(--color-info);
          }
        `}
      </style>
    </div>
  );
};
