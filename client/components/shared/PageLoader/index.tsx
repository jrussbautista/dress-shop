import React from 'react';
import { Spinner } from '../Spinner';

export const PageLoader: React.FC = () => {
  return (
    <>
      <div className="page-loader">
        <Spinner color="#3d3d3d" width={60} height={60} />
      </div>
      <style jsx>
        {`
          .page-loader {
            position: fixed;
            z-index: 99;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
};
