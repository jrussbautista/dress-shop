import React from 'react';

interface Props {
  color?: string;
  width: number;
  height: number;
}

export const Spinner: React.FC<Props> = ({ color = 'var(--color-primary)', width }) => {
  return (
    <>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <style jsx>
        {`
          .lds-ring {
            display: inline-block;
            position: relative;
            width: ${width}px;
            height: ${width}px;
          }
          .lds-ring div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: ${width - 16}px;
            height: ${width - 16}px;
            margin: 8px;
            border: 2px solid ${color};
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: ${color} transparent transparent transparent;
          }
          .lds-ring div:nth-child(1) {
            animation-delay: -0.45s;
          }
          .lds-ring div:nth-child(2) {
            animation-delay: -0.3s;
          }
          .lds-ring div:nth-child(3) {
            animation-delay: -0.15s;
          }
          @keyframes lds-ring {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
};
