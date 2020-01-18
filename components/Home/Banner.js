import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import SkeletonBanner from '../Shared/Loader/SkeletonBanner';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        console.log(error.response);
      } finally {
        setIsLoading(false);
      }
    };
    getBanners();
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonBanner />
      ) : (
        <Slider {...settings}>
          {banners.map(banner => (
            <div className="banner" key={banner._id}>
              <img src={banner.imageURL} alt="" />
            </div>
          ))}
        </Slider>
      )}
      <style jsx>
        {`
          .banner {
            height: 60rem;
            position: relative;
            width: 100%;
          }

          .banner img {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}
      </style>
    </>
  );
};

export default Banner;
