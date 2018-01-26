var express = require('express');
var router = express.Router();
var usersJson = require('./../../testdata/users.json');

/* GET home page. */
router.get("/", function(req, res) {
    res.send(usersJson);
});

module.exports = router;
