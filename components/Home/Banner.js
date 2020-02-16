import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import baseURL from '../../utils/baseURL';
import SkeletonBanner from '../Shared/Loader/SkeletonBanner';
import Error from 'next/error';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    dotsClass: 'slick-dots dots'
  };

  useEffect(() => {
    const getBanners = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/api/banners`);
        setBanners(data.banners);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getBanners();
  }, []);

  if (error) {
    return <Error statusCode={error.statusCode} />;
  }

  return (
    <>
      {isLoading ? (
        <SkeletonBanner />
      ) : (
        <Slider {...settings}>
          {banners.map(banner => (
            <div className="banner" key={banner._id}>
              <div
                className="img"
                style={{ backgroundImage: `url(${banner.imageURL})` }}
              ></div>
            </div>
          ))}
        </Slider>
      )}
      <style jsx>
        {`
          .banner {
            height: 50rem;
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
            background-position: center center;
            background-size: cover;
          }
        `}
      </style>
    </>
  );
};

export default Banner;
