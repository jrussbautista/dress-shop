const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

const environment = () => {
  let clientId = process.env.PAYPAL_CLIENT_ID;
  let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  // for production
  //   if (process.env.NODE_ENV === 'production') {
  //     return new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);
  //   }

  return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
};

export const client = () => {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
};
