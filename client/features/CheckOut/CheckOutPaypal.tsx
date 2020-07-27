import React, { useRef, useEffect } from 'react';
import Router from 'next/router';
import { CheckOutService } from '../../services';
import { parseCookies } from 'nookies';
import { useToast, useCart } from '../../store';

export const CheckOutPaypal = () => {
  const paypalButtonsRef = useRef<HTMLDivElement>(null);
  const { token } = parseCookies({});
  const { setToast } = useToast();
  const { clearCart } = useCart();

  useEffect(() => {
    if (window.paypal) {
      window.paypal
        .Buttons({
          createOrder: function () {
            return CheckOutService.createPaypalTransaction(token).then(
              (data) => {
                return data.orderID;
              }
            );
          },
          onError: function (error: any) {
            setToast('error', error.message);
          },
          onApprove: function (data: any, actions: any) {
            return CheckOutService.capturePaypalTransaction(
              token,
              data.orderID
            ).then(() => {
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
    <div style={{ position: 'relative', zIndex: 1 }} ref={paypalButtonsRef} />
  );
};
