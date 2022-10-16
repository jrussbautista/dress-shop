import apiClient from '@/lib/apiClient';
import { catchError } from '@/utils/catchError';

interface PaypalTransaction {
  orderID: string;
}

export const stripeCharge = async (paymentMethodId: string) => {
  try {
    const url = `/checkout/create-stripe-charge`;
    const { data } = await apiClient.post(url, { paymentMethodId });
    return data.data;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const createPaypalTransaction = async (): Promise<PaypalTransaction> => {
  try {
    const url = `/checkout/create-paypal-transaction`;
    const { data } = await apiClient.post(url);

    const paypalTransaction: PaypalTransaction = {
      orderID: data.data.orderID,
    };

    return paypalTransaction;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const capturePaypalTransaction = async (orderID: string): Promise<void> => {
  try {
    const url = `/checkout/capture-paypal-transaction`;
    return await apiClient.post(url, { orderID });
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const CheckOutService = {
  createPaypalTransaction,
  capturePaypalTransaction,
  stripeCharge,
};

export default CheckOutService;
