import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

export const Cloudinary = {
  upload: async (image: string) => {
    const res = await cloudinary.v2.uploader.upload(image, {
      folder: 'dress-shop/avatar',
      transformation: { width: 160, height: 160 },
    });
    return res.secure_url;
  },
};
