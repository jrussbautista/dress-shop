import React, { useState, useEffect } from 'react';

import styles from './BannerSection.module.css';

import Banners from '@/components/ui/Banners';
import { BannerService } from '@/services';
import { Banner } from '@/types';

const BannerSkeleton = () => {
  return <div className={styles.bannerSkeletonContainer} />;
};

const BannersSection: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [bannersStatus, setBannersStatus] = useState('loading');

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const results = await BannerService.getBanners();
        setBanners(results);
        setBannersStatus('succeed');
      } catch (error) {
        setBannersStatus('failed');
      }
    };
    fetchBanners();
  }, []);

  if (bannersStatus === 'loading' || bannersStatus === 'failed') {
    return <BannerSkeleton />;
  }

  return <Banners banners={banners} />;
};

export default BannersSection;
