import multer from "multer";
import sharp from "sharp";
import path from "node:path";
// storage
const multerStorage = multer.memoryStorage();

// file type check
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

export const imageUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 10000000 },
});

// image resize
export const imageUploadResize = async (req, res, next) => {
  // check if there is no file
  if (!req.file) return next();
  req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
  await sharp(req.file.buffer)
    .resize(250, 250)
    .toFormat("webp")
    .webp({ quality: 90 })
    .toFile(path.join(`public/images/profile/${req.file.filename}`));
  next();
};

export const postUploadResize = async (req, res, next) => {
  // check if there is no file
  if (!req.file) return next();
  req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
  await sharp(req.file.buffer)
    .resize(1920, 1080)
    .toFormat("webp")
    .webp({ quality: 90 })
    .toFile(path.join(`public/images/posts/${req.file.filename}`));
  next();
};
