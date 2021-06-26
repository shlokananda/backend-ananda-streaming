const BASE_ROUTE = "media";
var express = require("express");
var router = express.Router();
// Controllers
var media_controller = require("../controllers/media");

// GET media home page.
router.get("/", media_controller.index);

// GET list of  media
router.get("/list", media_controller.media_list);

// POST request for creating media.
router.post("/create", media_controller.media_create_post);

module.exports = router;
