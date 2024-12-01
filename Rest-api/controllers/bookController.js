const { userModel, bookModel } = require('../models');

function getBooks(req, res, next) {
    bookModel.find()
        .populate('userId')
        .then(books => res.json(books))
        .catch(next);
}

function getBook(req, res, next) {
    const { bookId } = req.params;

    bookModel.findById(bookId)
        .populate({
            path : 'books', 
            populate : {
              path : 'userId'
            }
          })
        .then(book => res.json(book))
        .catch(next);
}

function createBook(req, res, next) {  
  
    const { bookName, image, description } = req.body;  
    
    const { _id: userId } = req.user;

    console.log({ bookName, image, description });
    

    bookModel.create({ bookName, userId })
        .then(book => {
            newBook(bookName, image, description, userId, book._id)
                .then(([_, updatedBook]) => res.status(200).json(updatedBook))
        })
        .catch(next);
}

function newBook(bookName, image, description, userId, bookId) {
    return bookModel.create({ bookName, image, description, userId, bookId })
        .then(book => {
            return Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { books: book._id }, $addToSet: { books: bookId } }),
            ])
        })
}


function getLatestsBooks(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    bookModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate('bookId userId')
        .then(books => {
            res.status(200).json(books)
        })
        .catch(next);
}


function editBook(req, res, next) {
    
    const { bookId } = req.params;
    const { bookName, image, description } = req.body;
    const { _id: userId } = req.user; 

    // if the userId is not the same as this one of the post, the post will not be updated
    bookModel.findOneAndUpdate({ _id: bookId, userId }, { bookName, image, description }, { new: true })
        .then(updatedBook => {
            if (updatedBook) {
                res.status(200).json(updatedBook);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deleteBook(req, res, next) {
    const { bookId } = req.params;
    const { _id: userId } = req.user;  
    
    Promise.all([

        bookModel.findByIdAndDelete({ _id: bookId }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function like(req, res, next) {
    const { bookId } = req.params;
    const { _id: userId } = req.user;

    bookModel.updateOne({ _id: bookId }, { $addToSet: { likedList: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next)
}

module.exports = {
    getBooks,
    getBook,
    getLatestsBooks,
    createBook,
    deleteBook,
    editBook,
    like
}
