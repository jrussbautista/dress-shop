import { IoMdCart, IoIosSearch } from "react-icons/io";
import Link from "next/link";
import { useCart } from "../../store/cart/cart.context";
import { useAuth } from "../../store/auth/auth.context";

export default () => {
  const { carts } = useCart();
  const { currentUser, logout } = useAuth();

  return (
    <>
      <header className="header">
        <div className="header-wrapper">
          <Link href="/">
            <a className="site-title">Dress</a>
          </Link>
          <ul className="header-right">
            <div className="search-container">
              <form className="search-form">
                <input type="text" className="search-input" />
                <button className="search-button">
                  {" "}
                  <IoIosSearch size={30} />{" "}
                </button>
              </form>
            </div>
            <li>
              <Link href="/cart">
                <a>
                  <IoMdCart size={30} />
                  Cart
                  {currentUser && carts.length > 0 && (
                    <div className="cart-num">{carts.length}</div>
                  )}
                </a>
              </Link>
            </li>
            {currentUser ? (
              <li onClick={logout}>
                <span> Logout </span>
              </li>
            ) : (
              <li>
                <Link href="/signup">
                  <a>Sign Up</a>
                </Link>
                <span> | </span>
                <Link href="/login">
                  <a>Log In</a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </header>
      <style jsx>
        {`
          .header {
            position: sticky;
            z-index: 99;
            top: 0;
            left: 0;
            background-color: #fff;
          }
          .site-title {
            font-size: 3rem;
            font-weight: 600;
            color: #3d3d3d;
          }
          .header-wrapper {
            display: flex;
            align-items: center;
            max-width: 120rem;
            margin: 0 auto;
            height: 9rem;
            padding: 0 2rem;
          }

          .header-right {
            flex: 1;
            display: flex;
            justify-content: flex-end;
          }

          .header-right li {
            padding: 0 10px;
            display: flex;
            align-items: center;
            font-size: 1.7rem;
            position: relative;
          }

          .header-right span,
          .header-right a {
            display: flex;
            align-items: center;
            padding-left: 0.6rem;
            color: #3d3d3d;
          }

          .cart-num {
            width: 2.5rem;
            height: 2.5rem;
            position: absolute;
            top: -6px;
            left: 3.3rem;
            background-color: var(--color-primary);
            color: #fff;
            font-size: 1.4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
          }

          .search-container {
            display: flex;
            align-items: center;
            padding: 0 2rem;
          }

          .search-form {
            border: 1px solid #d3d3d3;
            width: 30rem;
            display: flex;
            height: 5rem;
            border-radius: 5rem;
            padding: 0 1rem 0 2rem;
          }

          .search-input {
            border: 1px solid transparent;
            width: 100%;
            font-size: 1.5rem;
          }

          .search-input:focus {
            outline: none;
          }

          .search-button {
            background-color: transparent;
            border: 1px solid transparent;
          }
        `}
      </style>
    </>
  );
};
