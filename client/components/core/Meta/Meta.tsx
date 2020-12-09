import React from 'react';
import Head from 'next/head';

interface Props {
  title: string;
}

const Meta: React.FC<Props> = ({ title }) => {
  const siteTitle = `Dress Shop - ${title}`;

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta property="og:title" content={siteTitle} key="title" />
    </Head>
  );
};

export default Meta;
