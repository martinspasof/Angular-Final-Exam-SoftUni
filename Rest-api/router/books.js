const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { bookController } = require('../controllers');

// middleware that is specific to this router

router.post('/createBook', auth(), bookController.createBook);
router.get('/', bookController.getBooks);
router.get('/latestBooks', bookController.getLatestsBooks);
router.delete('/:bookId', auth(), bookController.deleteBook);
router.put('/:bookId', auth(), bookController.editBook);
router.get('/:bookId', bookController.getBook);

module.exports = router