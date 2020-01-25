import nextConnect from 'next-connect';
const handler = nextConnect();
const multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const uploadImage = handler => (req, res, next) => {
  req.upload = upload.single('image');
  return handler(req, res, next);
};

export default uploadImage;
