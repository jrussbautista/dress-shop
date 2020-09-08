import React, { useEffect, useState } from 'react';
import { DashboardService } from 'services';
import { Spinner, ErrorPage } from 'components/shared';

interface IDashboard {
  products: number;
  orders: number;
  users: number;
}

export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IDashboard | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const results = await DashboardService.getDashboard();
        setData(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spinner width={60} height={60} />
      </div>
    );
  }

  if (error) {
    return <ErrorPage message="Unable to get products right now please try again later." />;
  }

  return (
    <div>
      <div className="welcome-title">
        Welcome back, <span>Admin</span>
      </div>
      <div className="list">
        <div className="item success">
          <div className="value">{data?.products}</div>
          <div className="title">Products</div>
        </div>
        <div className="item info">
          <div className="value">{data?.users}</div>
          <div className="title">Users</div>
        </div>
        <div className="item">
          <div className="value">{data?.orders}</div>
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
