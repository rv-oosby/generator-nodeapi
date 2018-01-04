const express = require('express');
const router = new express.Router();

router.route('/')
.get(function(req, res, next) {
  res.json("authenticated example");
});

module.exports = router;
