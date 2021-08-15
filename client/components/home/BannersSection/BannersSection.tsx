import React, { useState, useEffect } from 'react';

import Banners from '@/components/ui/Banners';
import { BannerService } from '@/services';
import { Banner } from '@/types';

import styles from './BannerSection.module.css';

const BannerSkeleton = () => {
  return <div className={styles.bannerSkeletonContainer} aria-label="Banners loading" />;
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
