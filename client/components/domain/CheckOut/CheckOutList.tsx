import React from 'react';
import { Cart } from 'types';
import { getCurrency } from 'utils/helpers';

interface Props {
  items: Cart[];
}

export const CheckOutList: React.FC<Props> = ({ items }) => {
  return (
    <>
      <div>
        {items.map((item) => (
          <div key={item._id} className="item-container">
            <div className="info">
              <div className="main">
                <img className="image" src={item.product.imageURL} alt={item.product.name} />
                <div>{item.product.name}</div>
              </div>

              <div className="content"></div>
              <div className="content">
                <div className="qty">{item.quantity}</div>
              </div>
              <div className="content">
                <div className="price">{getCurrency(item.product.price)}</div>
              </div>
              <div className="content" style={{ textAlign: 'right' }}>
                <div className="order-total">{getCurrency(item.product.price * item.quantity)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .item-container {
          padding: 1rem;
        }

        .main {
          display: flex;
          width: 250px;
        }

        .image {
          width: 12rem;
          height: 12rem;
          object-fit: contain;
        }

        .info {
          display: flex;
        }

        .price {
          color: var(--color-red);
          font-weight: 600;
          font-size: 1.6rem;
        }

        .content {
          flex: 1;
        }

        .order-total {
          color: var(--color-red);
          font-weight: 600;
          font-size: 1.7rem;
        }
      `}</style>
    </>
  );
};
