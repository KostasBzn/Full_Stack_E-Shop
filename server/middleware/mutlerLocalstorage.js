import multer from "multer";

const profileImageStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log("multer localstorage: destination: file:", file);
    callback(null, "uploads/prfim");
    //The path that the files will be stored
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now();
    callback(null, uniqueSuffix + "-" + file.originalname);
  },
});

const profileImageUpload = multer({ storage: profileImageStorage });

const productImageStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log("multer localstorage: destination: file:", file);
    callback(null, "uploads/prdim");
    //The path that the files will be stored
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now();
    callback(null, uniqueSuffix + "-" + file.originalname);
  },
});

const productImageUpload = multer({ storage: productImageStorage });

export { productImageUpload, profileImageUpload };
