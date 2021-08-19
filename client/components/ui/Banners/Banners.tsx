import React from 'react';
import Slider from 'react-slick';

import { Banner } from '@/types';

import styles from './Banners.module.css';

interface Props {
  banners: Banner[];
}

const Banners = ({ banners }: Props) => {
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    dotsClass: 'slick-dots dots',
  };

  return (
    <>
      <Slider {...settings}>
        {banners.map((banner) => (
          <div className={styles.banner} key={banner._id} role="banner">
            <img src={banner.imageURL} className={styles.img} alt={banner.name} />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Banners;
