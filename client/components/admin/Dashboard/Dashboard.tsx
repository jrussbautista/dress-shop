import React, { useEffect, useState } from 'react';
import { DashboardService } from 'services';
import { Spinner, ErrorMessage } from 'components/ui';
import styles from './Dashboard.module.css';

interface IDashboard {
  products: number;
  orders: number;
  users: number;
}

const Dashboard: React.FC = () => {
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
      <div className={styles.loadingSpinner}>
        <Spinner size={30} />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message="Unable to get products right now please try again later." />;
  }

  return (
    <div>
      <div className={styles.welcomeTitle}>
        Welcome back, <span>Admin</span>
      </div>
      <div className={styles.list}>
        <div className={`${styles.item} ${styles.success}`}>
          <div className={styles.value}>{data?.products}</div>
          <div className={styles.title}>Products</div>
        </div>
        <div className={`${styles.item} ${styles.info}`}>
          <div className={styles.value}>{data?.users}</div>
          <div className={styles.title}>Users</div>
        </div>
        <div className={styles.item}>
          <div className={styles.value}>{data?.orders}</div>
          <div className={styles.title}>Orders</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
