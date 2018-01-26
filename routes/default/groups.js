var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
    res.render("groups", {
        title: "Admin | Groups"
    });
});

module.exports = router;
