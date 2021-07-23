const BASE_ROUTE = "media";
const multer = require("multer");
var express = require("express");
var router = express.Router();
// Controllers
var media_controller = require("../controllers/media");

// GET media home page.
router.get("/", media_controller.index);

// GET list of  media
router.get("/list", media_controller.media_list);

// GET Detail of File (Metadata)
router.get("/detail", media_controller.media_detail);

// POST request for creating media.
router.post("/create", media_controller.media_create_post);

// POST request for upload media.
router.post(
  "/upload",
  multer().single("songs"),
  media_controller.media_upload_post
);

module.exports = router;
