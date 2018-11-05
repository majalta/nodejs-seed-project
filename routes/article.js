'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();
import logger from 'logger';

router.put('/sample', jsonParser, function(req, res, next) {
    try {
        if (req.body == null) {
            let e = new Error('[Sample] invalid body received');
            e.statusCode = 400;
            throw e;
        } else {
            res.send(res);
        }
    }
    catch(e) {
        next(e);
    };
});

module.exports = router;
