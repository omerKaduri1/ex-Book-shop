'use strict'

const BOOK_DB = 'bookDB'
var harryPotterUrl = 'https://wizkids.co.il/cdn/shop/products/02e5ee995b80d61e09a9849df5c83513_x700.gif?v=1514210286'
var worldUrl = 'https://shop.lonelyplanet.com/cdn/shop/products/the-world-lonely-planet-s-guide-to_900x.jpg?v=1667661690'
var hungerGamesUrl = 'https://m.media-amazon.com/images/I/71WSzS6zvCL._AC_UF1000,1000_QL80_.jpg'
var defaultUrl = 'https://wizkids.co.il/cdn/shop/products/Itstartswithus_x700.jpg?v=1669823430'

var gBooks
_createBooks()

function getBooks() {
    return gBooks
}

function removeBook(bookId) {
    console.log(bookId);
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    console.log(bookIdx);
    gBooks.splice(bookIdx, 1)
}

function updatePrice(bookId, newPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = (newPrice) ? newPrice : book.price
}

function addBook(title, price) {
    if (!title || !price) return
    const newBook = _createBook(title, price)
    gBooks.push(newBook)

}

function _createBooks() {
    // gBooks = loadFromStorage()

    if (!gBooks) {
        gBooks = [
            _createBook('Harry Potter', 200, harryPotterUrl),
            _createBook('The World', 150, worldUrl),
            _createBook('The Hunger Games', 100, hungerGamesUrl),
        ]
    }
}

function _createBook(title, price, imgUrl = defaultUrl) {
    return {
        id: makeId(),
        title,
        price,
        imgUrl
    }
}

function getBookById(bookId) {
    return gBooks.find(book => book.id === bookId)
}