var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
    res.render("edit", {
        title: "Admin | Edit",
        script: "/js/editGroups.js"
    });
});

module.exports = router;
