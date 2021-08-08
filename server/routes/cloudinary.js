const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// route controllers
const { upload, remove, uploadImage, uploadVideo } = require("../controllers/cloudinary");

// routes
router.post("/uploadimages", authCheck, upload);
router.post("/removeimage", authCheck, adminCheck, remove);

router.post("/uploadimage", authCheck, uploadImage);
router.post("/uploadvideo", authCheck, uploadVideo);

module.exports = router;
