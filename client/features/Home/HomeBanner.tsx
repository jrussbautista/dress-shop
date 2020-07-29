import React from 'react';
import Slider from 'react-slick';
import { Banner } from '../../types';

interface Props {
  banners: Banner[];
}

export const HomeBanner: React.FC<Props> = ({ banners }) => {
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
          <div className="banner" key={banner._id}>
            <div className="img" style={{ backgroundImage: `url(${banner.imageURL})` }}></div>
          </div>
        ))}
      </Slider>
      <style jsx>
        {`
          .banner {
            height: 55rem;
            position: relative;
            width: 100%;
          }

          @media only screen and (max-width: 768px) {
            .banner {
              height: 35rem;
            }
          }

          .banner .img {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background-position: center top;
            background-size: cover;
            background-repeat: no-repeat;
          }
        `}
      </style>
    </>
  );
};
