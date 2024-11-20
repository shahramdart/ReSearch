import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the uploads directory exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, callback) => {
  const validExts = [".png", ".jpg", ".jpeg", ".mp4"]; // Include .mp4

  if (!validExts.includes(path.extname(file.originalname).toLowerCase())) {
    return callback(
      new Error("Only .png, .jpg, .jpeg, and .mp4 formats allowed")
    );
  }

  callback(null, true);
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 40485760, // 10MB
  },
});

export default upload.array("images", 5); // Replace with your configuration
