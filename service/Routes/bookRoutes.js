var express = require('express');

var routes = function(){

    var bookRouter = express.Router();
    var Book  = require('../models/bookModel');
    var bookController = require('../Controllers/bookController')(Book);
    bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);

    bookRouter.use('/:bookId', bookController.getById);

    bookRouter.route('/:bookId')
    .get( (req, res) => {
       res.json(req.book);
    })
    .put(bookController.put)
    .patch(bookController.patch)
    .delete(bookController.deleteFunction);
    
    return bookRouter;
};

module.exports = routes;