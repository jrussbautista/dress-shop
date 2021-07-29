import React, { useEffect, useState } from 'react';

import { Categories } from '@/components/category';
import CategoriesSkeleton from '@/components/category/CategoriesSkeleton';
import { Heading } from '@/components/ui';
import { CategoryService } from '@/services';
import { Category } from 'types';

const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesStatus, setCategoriesStatus] = useState('loading');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const results = await CategoryService.getCategories();
        setCategories(results);
        setCategoriesStatus('succeed');
      } catch (error) {
        setCategoriesStatus('failed');
      }
    };
    fetchCategories();
  }, []);

  if (categoriesStatus === 'loading' || categoriesStatus === 'failed') {
    return (
      <>
        <Heading>Shop Categories</Heading>
        <CategoriesSkeleton />
      </>
    );
  }

  return (
    <>
      <Heading>Shop Categories</Heading>
      <Categories categories={categories} />
    </>
  );
};

export default CategoriesSection;
