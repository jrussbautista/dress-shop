import React, { useState } from 'react';
import { Input, Button } from 'components/shared';
import { useToast, useModal } from 'store';
import { ProductService } from 'services';
import { Product } from 'types';

interface Props {
  onAdd(product: Product): void;
}

const AddProduct: React.FC<Props> = ({ onAdd }) => {
  const { setToast } = useToast();
  const { closeModal } = useModal();

  const initState = {
    name: '',
    price: '',
    description: '',
    category: 'men',
  };

  const [product, setProduct] = useState(initState);
  const [imagePreview, setImagePreview] = useState<string | null | ArrayBuffer>(null);
  const [submit, setSubmit] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      imageChange(e.target.files[0]);
    }
  };

  const imageChange = (file: Blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      addProduct();
    } catch (error) {
      setToast('error', error.message);
      setSubmit(false);
    }
  };

  const addProduct = async () => {
    setSubmit(true);
    const data = {
      ...product,
      price: Number(product.price),
      image: imagePreview as string,
    };
    const results = await ProductService.addProduct(data);
    onAdd(results.product);
    reset();
    closeModal();
    setSubmit(false);
  };

  const reset = () => {
    setProduct(initState);
    setImagePreview(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Product Name"
          onChange={handleChange}
          required={true}
          value={product.name}
        />

        <div className="group">
          <div className="btn-upload-container">
            <input type="file" name="file" onChange={handleFileChange} required={true} />
            <button className="btn-upload">Upload Image</button>
          </div>

          <div className="img-upload-container">
            {
              <>
                {imagePreview ? (
                  <div
                    style={{ backgroundImage: `url(${imagePreview})` }}
                    className="preview-img"
                  />
                ) : (
                  <div> Image goes here </div>
                )}
              </>
            }
          </div>
        </div>
        <Input
          id="price"
          type="text"
          name="price"
          placeholder="Product Price"
          onChange={handleChange}
          required={true}
          value={product.price}
        />
        <Input
          id="description"
          type="text"
          name="description"
          placeholder="Product Description"
          onChange={handleChange}
          required={true}
          value={product.description}
        />

        <div className="group">
          <select
            name="category"
            onChange={handleChange}
            onBlur={handleChange}
            required={true}
            value={product.category}
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>
        <div>
          <Button
            type="submit"
            style={{ width: '100%' }}
            disabled={submit}
            title="Submit"
            loading={submit}
          />
        </div>
      </form>
      <style jsx>{`
        .preview-img {
          width: 30rem;
          height: 30rem;
          object-fit: contain;
          background-size: cover;
        }

        .form {
          width: 100%;
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

export default AddProduct;
