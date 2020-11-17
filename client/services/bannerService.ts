import apiClient from 'utils/apiClient';
import { Banner } from 'types';
import { catchError } from 'utils/catchError';

interface BannersData {
  banners: Banner[];
}

const getBanners = async (): Promise<BannersData> => {
  try {
    const { data } = await apiClient.get(`/banners`);

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
