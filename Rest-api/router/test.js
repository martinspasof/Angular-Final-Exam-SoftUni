const express = require('express');
const router = express.Router();
const utils = require('../utils')

// middleware that is specific to this router

const data = {
    "name": "rest-api",
    "version": "1.0.0",
    "description": "Update REST-api for back-end book App of Angular course workshop",
    "main": "index.js",
}

router.get('/', function (req, res) {

    res.send(data);
})

module.exports = router