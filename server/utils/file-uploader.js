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

export const upload = multer({storage})