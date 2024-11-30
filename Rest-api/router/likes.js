const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { bookController } = require('../controllers');

// middleware that is specific to this router

router.put('/:bookId', auth(), bookController.like);

module.exports = router
