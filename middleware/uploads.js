const multer = require("multer");
const fs = require("fs");
const path = require("path");

const maxSize = 2 * 1024 * 1024; // 2MB

// Ensure upload directory exists
const uploadPath = path.join(__dirname, "..", "uploads", "products");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, `IMG-${Date.now()}` + ext);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("File format not supported."), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: maxSize },
}).single("profilePicture"); // ✅ Changed "profilePicture" to "image" for products

module.exports = upload;
