import apiClient from '@/utils/apiClient';
import { Banner } from '@/types';
import { catchError } from '@/utils/catchError';

const getBanners = async (): Promise<Banner[]> => {
  try {
    const { data } = await apiClient.get(`/banners`);
    return data.data;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const BannerService = {
  getBanners,
};
