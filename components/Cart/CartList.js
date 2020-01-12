const CartList = ({ carts, removeCart }) => {
  return (
    <div>
      <>
        <div className="cart-header">
          <div className="cart-header-product"> Product </div>
          <div className="cart-header-lbl"> Price</div>
          <div className="cart-header-lbl"> Quantity</div>
          <div className="cart-header-lbl"> Total</div>
          <div className="cart-header-lbl"> Action </div>
        </div>
        {carts.map(cart => (
          <div key={cart.product._id} className="product-list">
            <div className="product">
              <div className="product-img">
                <img src={cart.product.imageURL} alt="" />
              </div>
              <div>
                <div className="product-name">{cart.product.name}</div>
              </div>
            </div>
            <div className="product-price product-content">
              P{cart.product.price}
            </div>
            <div className="product-qty product-content">{cart.quantity} </div>
            <div className="total product-content">
              P {parseFloat(cart.product.price * cart.quantity).toFixed(2)}
            </div>
            <div className="product-content">
              {" "}
              <button
                className="btn-remove"
                onClick={removeCart.bind(this, cart._id)}
              >
                {" "}
                Remove{" "}
              </button>
            </div>
          </div>
        ))}
      </>
      <style jsx>
        {`
          .cart-header {
            display: flex;
            font-size: 2rem;
            border-bottom: 1px solid #e8e8e1;
            padding: 2rem 0;
            margin-bottom: 3rem;
          }

          .cart-header-product {
            width: 45%;
            text-align: left;
          }

          .cart-header-lbl {
            flex: 1;
            text-align: center;
          }

          .product-list {
            display: flex;
            margin-top: 2rem;
          }

          .product {
            display: flex;
            width: 45%;
          }

          .product-content {
            flex: 1;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .product-info {
            padding: 0 1rem;
          }

          .product-name {
            font-size: 2.5rem;
            font-weight: 600;
          }

          .product-img {
            width: 15rem;
            height: 15rem;
            overflow: hidden;
          }

          .product-img img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .product-price {
            color: var(--color-primary);
            font-size: 2rem;
          }

          .product-qty {
            font-size: 2rem;
          }

          .total {
            font-size: 2rem;
          }

          .btn-remove {
            color: #fff;
            background-color: var(--color-dark);
            border: 1px solid var(--color-dark);
            padding: 1rem 1.2rem;
            display: block;
            font-size: 1.5rem;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default CartList;
