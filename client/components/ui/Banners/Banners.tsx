import React from 'react';
import Slider from 'react-slick';
import { Banner } from 'types';
import styles from './Banners.module.css';

interface Props {
  banners: Banner[];
}

const Banners: React.FC<Props> = ({ banners }) => {
  const settings = {
    dots: true,
    infinite: true,
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
          <div className={styles.banner} key={banner._id}>
            <div
              className={styles.img}
              style={{ backgroundImage: `url(${banner.imageURL})` }}
            ></div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Banners;
