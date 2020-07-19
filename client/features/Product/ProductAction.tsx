import React from 'react';
import { Button } from '../../shared';

interface Props {
  handleQty(type: string): void;
  qty: number;
  handleAddToCart(): void;
}

export const ProductAction: React.FC<Props> = ({
  handleQty,
  qty,
  handleAddToCart,
}) => {
  return (
    <>
      <div className="action">
        <div className="qty-container">
          <button className="btn" onClick={() => handleQty('sub')}>
            -
          </button>
          <input
            type="number"
            className="qty-input"
            value={qty}
            onChange={(e) => handleQty(e.target.value)}
          />
          <button className="btn" onClick={() => handleQty('add')}>
            +
          </button>
        </div>
        <Button
          type="button"
          onClick={handleAddToCart}
          variant="primary"
          title="Add to Cart"
          style={{ borderRadius: '50px', width: '20rem' }}
        />
      </div>
      <style jsx>{`
        .action {
          display: flex;
          margin: 4rem 0;
        }

        .qty-container {
          display: flex;
          height: 5rem;
          border: 1px solid #e6e6e6;
          margin: 0 1rem;
        }

        .qty-input {
          width: 5rem;
          text-align: center;
          font-size: 1.6rem;
          border-left: 1px solid #e6e6e6;
          border-right: 1px solid #e6e6e6;
          border-top: 1px solid transparent;
          border-bottom: 1px solid transparent;
          background-color: #f7f7f7;
        }

        .btn {
          width: 5rem;
          border: 1px solid transparent;
          background-color: #fff;
        }
      `}</style>
    </>
  );
};
