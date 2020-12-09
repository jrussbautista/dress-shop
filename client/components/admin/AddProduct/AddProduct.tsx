import React, { useState } from 'react';
import { Input, Button } from 'components/ui';
import { AddProduct as AddProductType } from 'types';
import styles from './AddProduct.module.css';

interface Props {
  onSubmit(product: AddProductType): void;
}

const AddProduct: React.FC<Props> = ({ onSubmit }) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);
    const newProduct = {
      ...product,
      price: Number(product.price),
      image: imagePreview as string,
    };
    await onSubmit(newProduct);
    setSubmit(false);
    reset();
  };

  const reset = () => {
    setProduct(initState);
    setImagePreview(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Product Name"
          onChange={handleChange}
          required={true}
          value={product.name}
        />

        <div className={styles.group}>
          <div className={styles.btnUploadContainer}>
            <input type="file" name="file" onChange={handleFileChange} required={true} />
            <Button type="button" title="Choose Image" />
          </div>

          <div className={styles.imgUploadContainer}>
            {imagePreview ? (
              <div style={{ backgroundImage: `url(${imagePreview})` }} className="preview-img" />
            ) : (
              <p> Image goes here </p>
            )}
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

        <div className={styles.group}>
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
            className={styles.btnSubmit}
            disabled={submit}
            title="Submit"
            loading={submit}
          />
        </div>
      </form>
    </>
  );
};

export default AddProduct;
