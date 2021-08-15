import { Meta, MobileBottomMenu } from '@/components/core';
import { BannersSection, CategoriesSection, ProductOverviewSection } from '@/components/home';
import { Container } from '@/components/ui';
import { useScrollRestoration } from '@/hooks';

const Home = () => {
  useScrollRestoration();

  return (
    <>
      <Meta />
      <BannersSection />
      <Container>
        <CategoriesSection />
        <ProductOverviewSection />
      </Container>
      <MobileBottomMenu />
    </>
  );
};

export default Home;
