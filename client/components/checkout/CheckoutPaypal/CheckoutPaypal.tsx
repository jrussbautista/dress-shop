import Router from 'next/router';
import React, { useRef, useEffect } from 'react';

import { useToast } from '@/contexts';
import { CheckOutService } from '@/services';

import styles from './CheckoutPaypal.module.css';

declare const window: Window &
  typeof globalThis & {
    paypal: any;
  };

interface ErrorMsg {
  message: string;
}

interface PaypalData {
  orderID: string;
}

const CheckoutPaypal = () => {
  const paypalButtonsRef = useRef<HTMLDivElement>(null);
  const { setToast } = useToast();

  useEffect(() => {
    if (window.paypal) {
      window.paypal
        .Buttons({
          createOrder: function () {
            return CheckOutService.createPaypalTransaction().then((data) => {
              return data.orderID;
            });
          },
          onError: function (error: ErrorMsg) {
            setToast('error', error.message);
          },
          onApprove: function (data: PaypalData) {
            return CheckOutService.capturePaypalTransaction(data.orderID).then(() => {
              setToast('success', 'Successfully transaction completed');
              Router.push('/orders');
            });
          },
          style: {
            height: 45,
          },
        })
        .render(paypalButtonsRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.paypal} ref={paypalButtonsRef} />
    </>
  );
};

export default CheckoutPaypal;
