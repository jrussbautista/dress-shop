import React, { useState, useEffect } from 'react';
import { Product } from 'types';
import { ProductService } from 'services';
import { ErrorMessage, Pagination, Spinner, Button, Modal } from 'components/shared';
import { FaTrash } from 'react-icons/fa';
import { formatPrice } from 'utils/helpers';
import { useModal, useToast } from 'contexts';
import styles from './Products.module.css';
import AddProduct from '../AddProduct';

const LIMIT = 10;

const Products: React.FC = () => {
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
    return <ErrorMessage message="Unable to get products right now please try again later." />;
  }

  const addProductModalElement = isOpen ? (
    <Modal title="Add Product">
      <AddProduct onAdd={addProduct} />
    </Modal>
  ) : null;

  return (
    <div className="table-container">
      {addProductModalElement}
      <div className={styles.addProductContainer}>
        <Button title="Add Product" onClick={() => openModal()} />
      </div>

      {products.length === 0 ? (
        <div className={styles.msg}> No products created yet. </div>
      ) : (
        <>
          <table className={styles.table}>
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
                      <div className={styles.productInfo}>
                        <img src={product.imageURL} alt={product.name} />
                        <div className={styles.name}> {product.name} </div>
                      </div>
                    </a>
                  </td>
                  <td>
                    <div className={styles.price}>{formatPrice(product.price)}</div>
                  </td>
                  <td>
                    <div className={styles.desc}>{product.description}</div>
                  </td>
                  <td>
                    <button className={styles.btnDelete} onClick={() => deleteProduct(product._id)}>
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
    </div>
  );
};

export default Products;
