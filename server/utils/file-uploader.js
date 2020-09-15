import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage/images/');
    },
    filename: function (req, file, cb) {
        let rand = Math.random().toString(36).substring(7);
        cb(null, rand + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

export const upload = multer({storage, fileFilter})