const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { bookController, postController } = require('../controllers');

// middleware that is specific to this router

router.post('/', auth(), bookController.createBook);
router.get('/', bookController.getBooks);
router.delete('/books/:bookId/', auth(), bookController.deleteBook);


router.get('/:bookId', bookController.getBook);


// router.get('/', bookController.getThemes);
// router.post('/', auth(), bookController.createTheme);

// router.get('/:themeId', bookController.getTheme);
// router.post('/:themeId', auth(), postController.createPost);
// router.put('/:themeId', auth(), bookController.subscribe);
// router.put('/:themeId/posts/:postId', auth(), postController.editPost);
// router.delete('/:themeId/posts/:postId', auth(), postController.deletePost);

// router.get('/my-trips/:id/reservations', auth(), bookController.getReservations);

module.exports = router