import { Banner, Category } from '@/types';

import { bannerGenerator, categoryGenerator } from './data-generators';

export const fakeBanners: Banner[] = [bannerGenerator(), bannerGenerator()];

export const fakeCategories: Category[] = [categoryGenerator(), categoryGenerator()];
