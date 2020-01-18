import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import SkeletonCategory from '../Shared/Loader/SkeletonCategory';
import Link from 'next/link';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/api/categories`);
        setCategories(data.categories);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  return (
    <div>
      {isLoading ? (
        <SkeletonCategory />
      ) : (
        <div className="category-container">
          {categories.map(category => (
            <div className="list" key={category._id}>
              <Link href={`/category?category=${category.name.toLowerCase()}`}>
                <a>
                  <div
                    className="category-img"
                    style={{
                      backgroundImage: `url(${category.imageURL})`
                    }}
                  ></div>
                  <div className="name">{category.name}</div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        .category-container {
          padding: 1rem 2rem 3rem 1rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 2rem;
        }

        .list {
          position: relative;
        }

        .name {
          position: absolute;
          top: 2rem;
          left: 2rem;
          font-size: 3rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--color-dark);
        }

        .category-img {
          width: 100%;
          height: 100%;
          padding-top: 56.25%;
          background-size: cover;
          border: 1px solid #eee;
        }
      `}</style>
    </div>
  );
};

export default Categories;
