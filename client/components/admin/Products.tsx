import React, { useState, useEffect } from 'react';
import { Product } from 'types';
import { ProductService } from 'services';
import { ErrorPage, Pagination, Spinner, Button, Modal } from 'components/shared';
import { FaTrash } from 'react-icons/fa';
import { formatPrice } from 'utils/helpers';
import { useModal, useToast } from 'contexts';
import AddProduct from './AddProduct';

const LIMIT = 10;

export const Products: React.FC = () => {
  const { setToast } = useToast();
  const { isOpen, openModal } = useModal();

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const payload = { params: { page, limit: LIMIT } };
        const results = await ProductService.fetchProducts(payload);
        setProducts(results.products);
        setTotal(results.total);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  const addProduct = (product: Product) => {
    setProducts([product, ...products]);
  };

  const deleteProduct = async (id: string) => {
    try {
      const isConfirm = window.confirm('Are you sure you want to delete this product?');
      if (!isConfirm) return;
      await ProductService.deleteProduct(id);
      const filterProducts = products.filter((product) => product._id !== id);
      setProducts(filterProducts);
      setToast('success', 'Successfully deleted');
    } catch (error) {
      setToast('error', error.message);
    }
  };

  const onChangePaginate = (val: number) => {
    setPage(val);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spinner width={60} height={60} />
      </div>
    );
  }

  if (error) {
    return <ErrorPage message="Unable to get products right now please try again later." />;
  }

  const addProductModalElement = isOpen ? (
    <Modal title="Add Product">
      <AddProduct onAdd={addProduct} />
    </Modal>
  ) : null;

  return (
    <div className="table-container">
      {addProductModalElement}
      <div className="add-product-container">
        <Button title="Add Product" onClick={() => openModal()} />
      </div>

      {products.length === 0 ? (
        <div className="msg"> No products created yet. </div>
      ) : (
        <>
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
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <a href={`/product?id=${product._id}`} target="_blank" rel="noreferrer">
                      <div className="product-info">
                        <img src={product.imageURL} alt={product.name} />
                        <div className="name"> {product.name} </div>
                      </div>
                    </a>
                  </td>
                  <td>
                    <div className="price">{formatPrice(product.price)}</div>
                  </td>
                  <td>
                    <div className="desc">{product.description}</div>
                  </td>
                  <td>
                    <button className="btn-delete" onClick={() => deleteProduct(product._id)}>
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination limit={LIMIT} onChange={onChangePaginate} total={total} active={page} />
        </>
      )}

      <style jsx>{`
        .table-container {
          padding: 2rem 0;
        }

        .add-product-container {
          display: flex;
          justify-content: flex-end;
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
          height: 10rem;
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

        .price {
          color: var(--color-primary);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};
