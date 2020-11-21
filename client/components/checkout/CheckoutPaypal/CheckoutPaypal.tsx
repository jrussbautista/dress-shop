import React, { useRef, useEffect } from 'react';
import Router from 'next/router';
import { CheckOutService } from 'services';
import { useToast, useCart } from 'contexts';
import styles from './CheckoutPaypal.module.css';

interface ErrorMsg {
  message: string;
}

interface PaypalData {
  orderID: string;
}

const CheckoutPaypal: React.FC = () => {
  const paypalButtonsRef = useRef<HTMLDivElement>(null);
  const { setToast } = useToast();
  const { clearCart } = useCart();

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
              clearCart();
              Router.push('/order');
            });
          },
          style: {
            height: 45,
          },
        })
        .render(paypalButtonsRef.current);
    }
  }, []);

  return (
    <>
      <div className={styles.paypal} ref={paypalButtonsRef} />
    </>
  );
};

export default CheckoutPaypal;
