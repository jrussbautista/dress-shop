import axios from 'axios';
import { API_URL } from '../utils/constants';

interface IntentPayment {
  clientSecret: string;
}

const createPaymentIntent = async (token: string): Promise<IntentPayment> => {
  const url = `${API_URL}/checkout/stripe/create-payment-intent`;
  const { data } = await axios.post(url, {}, { params: { token } });
  const intentPaymentData: IntentPayment = {
    clientSecret: data.data.clientSecret,
  };
  return intentPaymentData;
};

export const CheckOutService = {
  createPaymentIntent,
};
