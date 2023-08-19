const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const storage = multer.memoryStorage(); // Keep the file in memory

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only JPG, JPEG, and PNG images are supported"));
    }
  },
  limits: { fileSize: 100000000 },
}).single("image"); // Assuming you're uploading a single file with field name 'file'

const processAndSaveImage = (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  const newFilename = `${+new Date()}${path.extname(req.file.originalname)}`;
  const outputPath = `./media/${newFilename}`;

  sharp(req.file.buffer)
    .resize(600) // Example of resizing
    .toFile(outputPath, (err) => {
      if (err) {
        next(err);
        return;
      }

      // Replace the file info with the saved file's details
      req.file.filename = newFilename;
      req.file.path = outputPath.replace(/^\.?\//, ""); // This will remove the leading dot and the slash
      next();
    });
};

// Usage
// app.post('/upload', upload, processAndSaveImage, (req, res) => {
//     // Handle the response here...
// });

module.exports = { upload, processAndSaveImage };
