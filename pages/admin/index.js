import React, { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useModal } from '../../store';
import { useToast } from '../../hooks';
import { Modal, Toast, Spinner } from '../../components/Shared';
import Layout from '../../components/Layout';
import ProductForm from '../../components/Admin/Home/ProductForm';
import ProductTable from '../../components/Admin/Home/ProductTable';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import Pagination from '../../components/Shared/Pagination';
import { useRouter } from 'next/router';

const Admin = () => {
  const { show, closeModal, openModal } = useModal();
  const { isOpen, showToast } = useToast();
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const limit = 5;
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    async function getProducts() {
      try {
        const payload = { params: { page, limit } };
        const { data } = await axios.get(`${baseURL}/api/products`, payload);
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    }
    getProducts();
  }, [page]);

  async function handleDeleteProduct(id) {
    try {
      const payload = { params: { id } };
      await axios.delete(`${baseURL}/api/product`, payload);
      const filteredProducts = products.filter(product => product._id !== id);
      setProducts(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  }

  function addProduct(product) {
    setProducts([product, ...products]);
    showToast();
    setMessage('Product successfully added');
  }

  function addProductFormModal() {
    return (
      <Modal show={show} close={closeModal} title={`Add Product`}>
        <ProductForm onSubmit={val => addProduct(val)} onClose={closeModal} />
      </Modal>
    );
  }

  function confirmDeleteModal(id) {
    return (
      <Modal
        show={show}
        close={closeModal}
        title={`Delete Product`}
        hasFooter
        onSubmit={async () => {
          await handleDeleteProduct(id);
          showToast();
          setMessage('Successfully Deleted');
        }}
      >
        <div style={{ fontSize: '2rem' }}>
          Are you sure you want to delete this product?
        </div>
      </Modal>
    );
  }

  return (
    <Layout>
      <div className="container">
        <Toast isOpen={isOpen} message={message} />
        <div className="welcome-text">Hi, Welcome Back Admin</div>
        <div className="header">
          <div className="page-title"> List of All Products </div>
          <button
            onClick={() => openModal(addProductFormModal)}
            className="btn"
          >
            <span className="btn-text"> Add Product</span>
            <IoMdAdd />
          </button>
        </div>
        {loading ? (
          <div className="loading-container">
            <Spinner width="80" height="90" color={`var(--color-primary)`} />
          </div>
        ) : (
          <>
            <ProductTable
              products={products}
              deleteProduct={id => openModal(confirmDeleteModal(id))}
            />
            <Pagination total={totalProducts} limit={limit} activePage={page} />
          </>
        )}
      </div>{' '}
      <style jsx>{`
        .container {
          max-width: 120rem;
          margin: 3rem auto;
          padding: 0 2rem;
        }

        .loading-container {
          margin: 10rem 0;
          text-align: center;
        }
        .page-title {
          font-size: 2.5rem;
        }

        .header {
          display: flex;
          justify-content: space-between;
        }

        .welcome-text {
          font-size: 2rem;
          padding-bottom: 2rem;
        }

        .btn {
          height: 5rem;
          padding: 0 2rem;
          background-color: var(--color-dark);
          color: #fff;
          font-size: 2rem;
          border: 1px solid transparent;
          cursor: pointer;
        }

        .btn-text {
          margin-right: 0.5rem;
        }
      `}</style>{' '}
    </Layout>
  );
};

export default Admin;
