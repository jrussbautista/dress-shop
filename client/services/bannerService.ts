import axios from 'axios';
import { API_URL } from '../utils/constants';
import { Banner } from '../types';

interface BannersData {
  banners: Banner[];
}

const getBanners = async (): Promise<BannersData> => {
  const { data } = await axios.get(`${API_URL}/banners`);

  const bannersData: BannersData = {
    banners: data.data.banners,
  };

  return bannersData;
};

export const BannerService = {
  getBanners,
};
