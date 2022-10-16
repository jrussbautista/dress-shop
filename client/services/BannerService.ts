import apiClient from '@/lib/apiClient';
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

const BannerService = {
  getBanners,
};

export default BannerService;
