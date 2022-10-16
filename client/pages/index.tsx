import { InferGetStaticPropsType } from 'next';

import { Categories } from '@/components/category';
import { Meta, MobileBottomMenu } from '@/components/core';
import { ProductOverviewSection } from '@/components/home';
import { Banners, Container, Heading } from '@/components/ui';
import { useScrollRestoration } from '@/hooks';
import BannerService from '@/services/BannerService';
import CategoryService from '@/services/CategoryService';
import ProductService from '@/services/ProductService';

const Home = ({
  banners,
  categories,
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  useScrollRestoration();

  return (
    <>
      <Meta />
      <Banners banners={banners} />
      <Container>
        <Heading>Categories</Heading>
        <Categories categories={categories} />
        <ProductOverviewSection initialProducts={products} />
      </Container>
      <MobileBottomMenu />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const PAGE = 1;
  const LIMIT = 12;

  const banners = await BannerService.getBanners();
  const categories = await CategoryService.getCategories();
  const products = await ProductService.getProducts({ page: PAGE, limit: LIMIT });

  return {
    props: {
      banners,
      categories,
      products,
    },
    revalidate: 60,
  };
}
