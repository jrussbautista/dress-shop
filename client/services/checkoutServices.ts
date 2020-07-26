import axios from 'axios';
import { API_URL } from '../utils/constants';
import { catchError } from '../utils/catchError';

interface IntentPayment {
  clientSecret: string;
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

export const CheckOutService = {
  createPaymentIntent,
};
