import { catchError } from 'utils/catchError';
import apiClient from 'utils/apiClient';

interface IntentPayment {
  clientSecret: string;
}

interface PaypalTransaction {
  orderID: string;
}

const createPaymentIntent = async (): Promise<IntentPayment> => {
  try {
    const url = `/checkout/stripe/create-payment-intent`;
    const { data } = await apiClient.post(url);
    const intentPaymentData: IntentPayment = {
      clientSecret: data.data.clientSecret,
    };
    return intentPaymentData;
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

export const CheckOutService = {
  createPaymentIntent,
  createPaypalTransaction,
  capturePaypalTransaction,
};
