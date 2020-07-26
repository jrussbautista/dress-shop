import axios from 'axios';
import { API_URL } from '../utils/constants';
import { Banner } from '../types';
import { catchError } from '../utils/catchError';

interface BannersData {
  banners: Banner[];
}

const getBanners = async (): Promise<BannersData | undefined> => {
  try {
    const { data } = await axios.get(`${API_URL}/banners`);

    const bannersData: BannersData = {
      banners: data.data.banners,
    };

    return bannersData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const BannerService = {
  getBanners,
};
