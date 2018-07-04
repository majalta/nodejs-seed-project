'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();

router.put('/ads-slots', jsonParser, function(req, res, next) {
    try {
        res.send(response);
    }
    catch(e => {
        next(e);
    });
});

module.exports = router;
