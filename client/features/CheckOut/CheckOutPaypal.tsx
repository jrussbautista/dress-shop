import React, { useRef, useEffect } from 'react';

export const CheckOutPaypal = () => {
  const paypalButtonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: function (data: any, actions: any) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: '0.01',
                },
              },
            ],
          });
        },
        onApprove: function (data: any, actions: any) {
          return actions.order.capture().then(function (details: any) {
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        },
        style: {
          height: 45,
        },
      })
      .render(paypalButtonsRef.current);
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 1 }} ref={paypalButtonsRef} />
  );
};
