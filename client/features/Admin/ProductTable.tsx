import { FaTrash } from 'react-icons/fa';

export const ProductTable: React.FC<any> = ({ products, deleteProduct }) => {
  return (
    <div className="table-container">
      {products.length === 0 ? (
        <div> No products created yet. </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '30rem' }}> Product </th>
              <th> Price </th>
              <th style={{ width: '20rem' }}> Description </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product._id}>
                <td>
                  <div className="product-info">
                    <img src={product.imageURL} alt={product.name} />
                    <div className="name"> {product.name} </div>
                  </div>
                </td>
                <td>
                  <div>P {product.price}</div>
                </td>
                <td>
                  <div className="desc">{product.description}</div>
                </td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => deleteProduct(product._id)}
                  >
                    <span className="text"> Delete </span> <FaTrash size={20} />{' '}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <style jsx>{`
        .table-container {
          padding: 2rem 0;
        }
        .table {
          width: 100%;
        }

        .table td {
          border-bottom: 1px solid var(--color-dark);
          padding: 1rem 0;
          text-align: center;
          font-size: 1.6rem;
        }

        .table th {
          font-size: 2rem;
          font-weight: 600;
          border-bottom: 1px solid var(--color-dark);
          padding: 1rem;
        }

        .product-info {
          display: flex;
        }

        .product-info img {
          width: 10rem;
        }

        .name {
          font-size: 1.7rem;
          padding: 0 1rem;
        }

        .desc {
          width: 20rem;
        }

        .btn-delete {
          padding: 1rem 1.5rem;
          background-color: var(--color-primary);
          color: #fff;
          border: 1px solid transparent;
          border-radius: 6px;
          font-size: 1.6rem;
          display: inline-flex;
          align-items: center;
          cursor: pointer;
        }
        .btn-delete .text {
          margin-right: 0.5rem;
        }
      `}</style>
    </div>
  );
};
