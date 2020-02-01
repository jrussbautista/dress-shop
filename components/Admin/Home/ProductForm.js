import React, { useState } from 'react';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';
import Spinner from '../../Shared/Loader/Spinner';

const ProductForm = () => {
  const initState = {
    name: '',
    price: '',
    description: '',
    category: ''
  };

  const [product, setProduct] = useState(initState);
  const [imagePreview, setImagePreview] = useState('');
  const [file, setFile] = useState('');
  const [submit, setSubmit] = useState(false);

  const handleChange = e => {
    if (e.target.name === 'file') {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setFile(e.target.files[0]);
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value
      });
    }
  };

  const imageUpload = async () => {
    try {
      let data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'dress-shop');
      data.append('cloud_name', 'djlbfjouc');
      //upload image to cloudinary
      const res = await axios.post(process.env.CLOUDINARY_URL, data);
      return res.data.secure_url;
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setSubmit(true);
      //get url of image
      const imageURL = await imageUpload();
      const payload = { ...product, imageURL };
      //save product to db
      await axios.post(`${baseURL}/api/products`, payload);
      reset();
    } catch (error) {
      console.log(error.response);
    } finally {
      setSubmit(false);
    }
  };

  const reset = () => {
    setProduct(initState);
    setFile('');
    setImagePreview('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="group">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            required={true}
            value={product.name}
          />
        </div>
        <div className="group">
          <div className="btn-upload-container">
            <input
              type="file"
              name="file"
              onChange={handleChange}
              required={true}
            />
            <button className="btn-upload">Upload Image</button>
          </div>

          <div className="img-upload-container">
            {
              <div>
                {imagePreview ? (
                  <img src={imagePreview} className="preview-img" />
                ) : (
                  <div> Image goes here </div>
                )}
              </div>
            }
          </div>
        </div>
        <div className="group">
          <input
            type="text"
            name="price"
            placeholder="Product Price"
            onChange={handleChange}
            required={true}
            value={product.price}
          />
        </div>
        <div className="group">
          <input
            type="text"
            name="description"
            placeholder="Product Description"
            onChange={handleChange}
            required={true}
            value={product.description}
          />
        </div>
        <div className="group">
          <select
            name="category"
            id=""
            onChange={handleChange}
            required={true}
            value={product.category}
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>
        <div>
          <button className="btn-submit" disabled={submit}>
            {submit ? (
              <Spinner color="#fff" width={40} height={40} />
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
      <style jsx>{`
        .preview-img {
          width: 30rem;
          height: 30rem;
          object-fit: contain;
        }

        .form {
          width: 60rem;
        }

        .form input {
          border: 1px solid transparent;
          border-bottom: 1px solid var(--color-dark);
          width: 100%;
          height: 5rem;
          font-size: 1.6rem;
        }

        .form input:focus {
          outline: none;
        }

        .form select {
          border: 1px solid var(--color-dark);
          width: 100%;
          height: 5rem;
          font-size: 1.6rem;
          background-color: #fff;
          padding: 0 1rem;
        }

        .group {
          padding: 1rem 0;
          margin-bottom: 1rem;
        }

        .btn-submit {
          height: 6rem;
          width: 100%;
          background-color: var(--color-dark);
          color: #fff;
          font-size: 2rem;
          border: 1px solid transparent;
        }

        .img-upload-container {
          position: relative;
          width: 30rem;
          height: 30rem;
          border: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          overflow: hidden;
        }

        .btn-upload-container input {
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .btn-upload-container {
          position: relative;
          width: 20rem;
          height: 5rem;
          margin-bottom: 2rem;
          cursor: pointer;
        }

        .btn-upload {
          background-color: var(--color-dark);
          border: 1px solid transparent;
          color: #fff;
          font-size: 1.7rem;
          border-radius: 6px;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default ProductForm;
