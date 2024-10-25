// OM NAMASIVAYA
import multer from "multer";

//storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uplodes')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + '-' + file.originalname )
    }
})

const fileFilter = (req, file, cb)=>{
  if(/jpeg|jpg|png|gif/.test(file.mimetype)) return cb(null, true);
  cb(new Error('Only image files are allowed.'));
}

const uploadImage = multer({ storage: storage, fileFilter: fileFilter}).single("image");

const uplodeImageWithValidator = (req, res, next) => {
  uploadImage(req, res, (err) =>{
      if (err) {
          // Handle multer errors (including file type and file count)
          return res.status(400).json({ error: `image filed: ${err.message} or you have uploded more then 1 image` });
      }
      next();
  })
};

export { uplodeImageWithValidator };


