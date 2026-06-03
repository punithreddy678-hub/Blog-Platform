const express = require("express");

const { uploadImage } = require("../controllers/uploadController");

const upload = require("../middleware/upload");

const router = express.Router();

// Upload image
router.post("/", upload.single("image"), uploadImage);

module.exports = router;