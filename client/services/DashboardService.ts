import apiClient from 'utils/apiClient';
import { catchError } from 'utils/catchError';

interface DashboardData {
  products: number;
  orders: number;
  users: number;
}

const getDashboard = async (): Promise<DashboardData> => {
  try {
    const { data } = await apiClient.get(`/dashboard`);

    const dashboardData: DashboardData = {
      products: data.data.products,
      orders: data.data.orders,
      users: data.data.users,
    };

    return dashboardData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const DashboardService = {
  getDashboard,
};
