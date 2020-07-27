import axios from 'axios';
import { API_URL } from '../utils/constants';
import { catchError } from '../utils/catchError';

interface IntentPayment {
  clientSecret: string;
}

interface PaypalTransaction {
  orderID: string;
}

const createPaymentIntent = async (token: string): Promise<IntentPayment> => {
  try {
    const url = `${API_URL}/checkout/stripe/create-payment-intent`;
    const { data } = await axios.post(url, {}, { params: { token } });
    const intentPaymentData: IntentPayment = {
      clientSecret: data.data.clientSecret,
    };
    return intentPaymentData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const createPaypalTransaction = async (token: string) => {
  try {
    const url = `${API_URL}/checkout/create-paypal-transaction`;
    const { data } = await axios.post(url, {}, { params: { token } });

    const paypalTransaction: PaypalTransaction = {
      orderID: data.data.orderID,
    };

    return paypalTransaction;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const capturePaypalTransaction = async (
  token: string,
  orderID: string
) => {
  try {
    const url = `${API_URL}/checkout/capture-paypal-transaction`;
    return await axios.post(url, { orderID }, { params: { token } });
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const CheckOutService = {
  createPaymentIntent,
  createPaypalTransaction,
  capturePaypalTransaction,
};
