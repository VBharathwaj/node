var express = require('express');

var routes = function(){

    var bookRouter = express.Router();
    var Book = require('../Models/Book');
    var bookController = require('../Controllers/Book')(Book);

    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);

    bookRouter.use('/:bookId', bookController.getByIdDefault);

    bookRouter.route('/:bookId')
        .get(bookController.getById)
        .put(bookController.put)
        .patch(bookController.patch)
        .delete(bookController.deleteBook);

        return bookRouter;
}

module.exports = routes;
