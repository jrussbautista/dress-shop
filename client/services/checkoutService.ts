import { catchError } from 'utils/catchError';
import { setAuthToken } from 'utils/auth';
import apiClient from 'api/apiClient';

interface IntentPayment {
  clientSecret: string;
}

interface PaypalTransaction {
  orderID: string;
}

const createPaymentIntent = async (token: string): Promise<IntentPayment> => {
  try {
    setAuthToken(token);
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

export const createPaypalTransaction = async (token: string): Promise<PaypalTransaction> => {
  try {
    setAuthToken(token);
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

export const capturePaypalTransaction = async (token: string, orderID: string): Promise<void> => {
  try {
    setAuthToken(token);
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
