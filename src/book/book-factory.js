const Book = require('./book');
const Publisher = require('../publisher/publisher');
const connection = require('../../database/connection');

class BookFactory {
	
	/**
	 *
	 * @param {Object} bookRaw
	 * @return {Book}
	 */
	makeFromDB (bookRaw) {
		let book = new Book (bookRaw.title, bookRaw.author);
		book.setId (bookRaw.id);
		book.setPrice (bookRaw.price);
		let publisher = new Publisher (bookRaw.name);
		publisher.setId (bookRaw.publisher_id);
		publisher.setAddress (bookRaw.address);
		publisher.setPhone (bookRaw.phone);
		book.setPublisher (publisher);
		return book;
	}
	
	/**
	 *
	 * @param bookRaw
	 * @return {Book} book
	 */
	makeFromRequest (bookRaw) {
		let book = new Book (bookRaw.title, bookRaw.author);
		book.setPrice (bookRaw.price);
		book.setId(bookRaw.id);
		return connection.table ('publishers').where ({id: bookRaw.publisher_id})
				.then (result => result.map(element => {
                    let publisher = new Publisher(element.name);
                    publisher.setId(element.id);
                    publisher.setAddress(element.address);
                    publisher.setPhone(element.phone);
					book.setPublisher(publisher);
					return book;
				})
        );
	}
}

module.exports = BookFactory;
