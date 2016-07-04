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

    return {
        post: post,
        get: get
    }
};

module.exports = bookController;

