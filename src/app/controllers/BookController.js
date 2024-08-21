const BookService = require("../services/BookService");

class BookController {
    async store(req, res) {
        const { name, author, isbn, thumbnail_url, description } = req.body;

        const user_id = req.userId;

        const book = await BookService.create(name, author, isbn, thumbnail_url, user_id, description);

        return res
            .status(201)
            .json({
                id: book.id,
                name: book.name,
                author: book.author,
                isbn: book.isbn,
                thumbnail_url: book.thumbnail_url,
                description: book.description,
                updatedAt: book.updatedAt,
                createdAt: book.createdAt
            });
    }
}

module.exports = new BookController();