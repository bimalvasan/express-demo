var bookController = function (Book) {
    var post = function (req, res) {
        var book = new Book(req.body);
        //console.log(book);
        book.save();
        res.status(201).send(book);
    };

    var get = function (req, res) {
        //var responseJson = { hello: "This is my API!"};
        //res.json(responseJson);
        var query = {};

        //Validation
        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        Book.find(query, function (err, books) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else
                res.json(books);
        });
    };

    var getById = function (req, res) {
        res.json(req.book);
    };

    var put = function (req, res) {
        req.book.title = req.body.title;
        req.book.genre = req.body.genre;
        req.book.author = req.body.author;
        req.book.read = req.body.read;
        req.book.save(function (err) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.json(req.book);
            }
        });
    };

    var patch = function (req, res) {
        if (req.body._id) {
            delete req.body._id;
        }

        for (var p in req.body) {
            req.book[p] = req.body[p];
        }

        req.book.save(function (err) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.json(req.book);
            }
        });
    };

    var del = function (req, res) {
        req.book.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(204).send('Removed.');
            }
        });
    };

    return {
        post: post,
        get: get,
        getById: getById,
        put: put,
        patch: patch,
        del: del
    }
};

module.exports = bookController;

