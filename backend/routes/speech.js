const express = require("express");
const multer = require("multer");
const router = express.Router();

const speechController = require("../controller/speech.js");
const upload = multer({ dest: "uploads/" });

router.route("/speech-to-speech").post(upload.single("file"), speechController);

module.exports = router;