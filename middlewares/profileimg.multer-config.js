const multer = require("multer");
const mkdirp = require("mkdirp");
const { MIME_TYPES } = require("../constant");

const dir = "public/uploads/storeownerimgs";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    mkdirp(dir)
      .then((data) => callback(null, dir))
      .catch((e) => callback(e, dir));
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, Date.now() + "." + extension);
  },
});

const fileFilter = (req, file, cb) => {
  if (!MIME_TYPES[file.mimetype]) {
    cb("File must be an image", false);
  } else {
    cb(null, true);
  }
};

module.exports = multer({
  storage: storage,
  limit: {
    fileSize: 2000000,
  },
  fileFilter,
}).single("image");
