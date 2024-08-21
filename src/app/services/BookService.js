const { Book } = require("../models");

class BookService {
    async create(name, author, isbn, thumbnail_url, user_id, description) {
        return Book.create({
            name: name,
            author: author,
            isbn: isbn,
            thumbnail_url: thumbnail_url,
            user_id: user_id,
            description: description
        });
    }
}

module.exports = new BookService();