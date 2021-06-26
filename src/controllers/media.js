var Media = require("../model/media");

exports.index = function (req, res) {
  res.send("Media API Ready");
};

// Display list of all medias.
exports.media_list = function (req, res) {
  res.send("NOT IMPLEMENTED: Media list");
};

// Display detail page for a specific media.
exports.media_detail = function (req, res) {
  res.send("NOT IMPLEMENTED: Media detail: " + req.params.id);
};

// Display media create form on GET.
exports.media_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Media create GET");
};

// Handle media create on POST.
exports.media_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Media create POST");
};

// Display media delete form on GET.
exports.media_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Media delete GET");
};


