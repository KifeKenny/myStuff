var express = require('express');
var router = express.Router();
var groups = require('./../../testdata/groups.json');

/* GET home page. */
router.get("/", function(req, res) {
    res.send(groups);
});

module.exports = router;
