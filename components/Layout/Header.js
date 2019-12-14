export default () => {
  return (
    <>
      <header>
        <div className="header-wrapper">
          <div className="site-title">Dress</div>
          <ul className="header-right">
            <li>Cart</li>
            <li>Favorites</li>
            <li>Profile</li>
          </ul>
        </div>
      </header>
      <style jsx>
        {`
          .site-title {
            font-size: 2rem;
          }
          .header-wrapper {
            display: flex;
            align-items: center;
            max-width: 120rem;
            margin: 0 auto;
            height: 7rem;
            padding: 0 2rem;
          }

          .header-right {
            flex: 1;
            display: flex;
            justify-content: flex-end;
          }

          .header-right li {
            padding: 0 10px;
            font-size: 1.7rem;
          }
        `}
      </style>
    </>
  );
};
