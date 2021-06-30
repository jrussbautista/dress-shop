import React from 'react';
import Head from 'next/head';

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const Meta: React.FC<Props> = ({
  title = 'Buy best and quality products',
  description = 'Dress Shop | Buy best and quality products',
  image = 'https://dress-shop.vercel.app/featured.png',
}) => {
  const siteTitle = `Dress Shop | ${title}`;

  return (
    <Head>
      <title>{siteTitle}</title>

      <meta name="twitter:card" content={description} />
      <meta name="twitter:site" content="@dress_shop" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
};

export default Meta;
