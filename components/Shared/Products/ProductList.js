import Link from "next/link";

export default ({ products }) => {
  return (
    <>
      <div className="product-grid">
        {products.map(product => (
          <Link href="/">
            <a>
              <div>
                <div className="product-img-cover">
                  <img className="product-img" src={product.imageURL} alt="" />
                </div>
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <style jsx>
        {`
          .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
            grid-gap: 2rem;
            padding: 0 2rem;
          }

          .product-img-cover {
            position: relative;
            padding-top: 100%;
            background-color: var(--color-gray);
          }

          .product-img {
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            object-fit: cover;
          }

          .product-info {
            padding: 1rem;
          }

          .product-name {
            font-size: 1.7rem;
            color: var(--color-dark);
          }
        `}
      </style>
    </>
  );
};
