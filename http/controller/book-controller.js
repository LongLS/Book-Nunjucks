class BookController {

    constructor() {

    }

    createBook(request, response, next) {
        // console.log(request.book);
        let repo = request.app.get('books.repo');
        repo.add(request.book).then(function () {
			response.status(201).send({message: "Success!"});
        }).catch(function (err) {
            next(err);
        });
    }

    deleteBook(request, response) {
        let repo = request.app.get('books.repo');
        repo.remove(request.params.id).then(function () {
            response.status(200).json({message:'Success'});
        });
    }

    editBook(request, response, next) {
        let repo = request.app.get('books.repo');
        repo.edit(request.book).then(function () {
            response.status(200).json({message:'Success'});
        }).catch(function (err) {
			next(err);
		});
    }

    search(request, response, next) {
        request.app.get('book.searcher').search(request.condition)
            .then(books => response.render('list-book.njk',{books:books}))
            .catch(next)
    }
}

module.exports = BookController;