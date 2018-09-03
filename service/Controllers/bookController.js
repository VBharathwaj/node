var bookController = (Book) => {
    
    var post = function(req, res){
        var book = new Book(req.body);
        console.log(book);
        //book.save();
        res.status(201).send(book);
    };

    var get = function(req, res){
        var query = {};
        if(req.query.title){
            query.title = req.query.title;
        }
        Book.find(query,  (err,books) => {
            if(err)
                res.status(500).send(err);
            else
                res.json(books);
        });
    };

    var getById = function(req, res, next){
        Book.findById(req.params.bookId, (err, book) => {
            if(err){
                res.status(500).send(err);
            }else if(book){
                req.book = book;
                next();
            }else{
                res.status(404).send('Book Not Found');
            }
        });
    };

    var put = function(req, res){
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.read = req.body.read;
        req.book.save((err) => {
            if(err)
                res.status(500).send(err);
            else
                res.json(req.book);
        });
    };


    var patch = function(req,res){
        if(req.body._id){
            delete(req.body._id);
        }
        for(var key in req.body){
            req.book[key] = req.body[key];
        }
        req.book.save((err) => {
            if(err)
                res.status(500).send(err);
            else
                res.json(req.book);
        });
    };

    var deleteFunction = function(req, res){
        req.book.remove((err)=>{
            if(err)
                res.status(500).send(err);
            else
                res.status(204).send('Removed!');
        });
    };

    return{
        post: post,
        get: get,
        getById: getById,
        put: put,
        patch: patch,
        deleteFunction: deleteFunction
    }
};

module.exports = bookController;