import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

export const Cloudinary = {
  upload: async (
    image: string,
    folder: string,
    { width, height }: { width: number; height: number | string }
  ) => {
    const res = await cloudinary.v2.uploader.upload(image, {
      folder: `dress-shop/${folder}`,
      transformation: { width, height, crop: "fill" },
      overwrite: true,
      invalidate: true,
    });
    return res.secure_url;
  },
};
