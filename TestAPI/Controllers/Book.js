var bookController = (Book) => {
    var get = (req,res) => {
        var query = {};

        if(req.query.genre){
            query.genre = req.query.genre;
        }
        Book.find(query, (err,books) => {
            if(err)
                res.status(500).send(err);
            else if(books == '')   
                res.status(404).send('Genre Not Found');
            else
                res.json(books);
        });
    };

    var post = (req, res) => {
        var newBook = new Book(req.body);
        newBook.save();
        res.json(newBook);
    };

    var getByIdDefault = (req, res, next) => {
        Book.findById(req.params.bookId, (err, book) => {
            if(err)
                res.status(500).send(err);
            else if(book){
                req.book = book;
                next();
            }
            else
                res.status(404).send('Book Not Found');
        });
    };

    var getById = (req,res) => {
        res.json(req.book);
    };

    var put = (req, res) => {
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.pages = req.body.pages;
        req.book.save();
        res.json(req.book);
    };

    var patch = (req, res) => {
        if(req.body._id)
            delete(req.body.Id);
        for(var key  in req.body){
            req.book[key] = req.body[key];
        }
        req.book.save();
        res.json(req.book);
    };

    var deleteBook = (req, res) => {
        req.book.remove();
        res.json(req.book);
    };

    return{
        get: get,
        post: post,
        getByIdDefault: getByIdDefault,
        getById: getById,
        put: put,
        patch: patch,
        deleteBook: deleteBook
    }
};

module.exports = bookController;