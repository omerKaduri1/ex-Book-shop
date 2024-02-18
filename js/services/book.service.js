'use strict'

var harryPotterUrl = 'https://wizkids.co.il/cdn/shop/products/02e5ee995b80d61e09a9849df5c83513_x700.gif?v=1514210286'
var worldUrl = 'https://shop.lonelyplanet.com/cdn/shop/products/the-world-lonely-planet-s-guide-to_900x.jpg?v=1667661690'
var hungerGamesUrl = 'https://m.media-amazon.com/images/I/71WSzS6zvCL._AC_UF1000,1000_QL80_.jpg'
var defaultUrl = 'https://wizkids.co.il/cdn/shop/products/Itstartswithus_x700.jpg?v=1669823430'

const BOOK_DB = 'bookDB'
var gBooks
// var gFilterBy = ''
_createBooks()

function getBooks(options) {
    const books = _filterBooks(options.filterBy)

    if (options.sortBy.title) {
        books.sort((book1, book2) => (book1.title.localeCompare(book2.title)) * options.sortBy.title)
    } else if (options.sortBy.price) {
        books.sort((book1, book2) => (book1.price - book2.price) * options.sortBy.price)
    } else if (options.sortBy.rating) {
        books.sort((book1, book2) => (book1.rating - book2.rating) * options.sortBy.rating)
    }

    const startIdx = options.page.idx * options.page.size
    return books.slice(startIdx, startIdx + options.page.size)
}

function getTotalPageCount(options) {
    const books = _filterBooks(options.filterBy)
    return Math.ceil(books.length / options.page.size)
}

function _filterBooks(filterBy) {
    const books = gBooks.filter(book =>
        book.title.toLowerCase().includes(filterBy.txt.toLowerCase()) &&
        book.rating >= filterBy.minRating)
    return books
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    if (bookIdx !== -1) gBooks.splice(bookIdx, 1)
    _saveBooks()
}

function updatePrice(bookId, newPrice) {
    const book = getBookById(bookId)
    if (newPrice === book.price) return
    book.price = (newPrice) ? newPrice : book.price
    _saveBooks()
}

function addBook(title, price) {
    if (!title || !price) return
    const newBook = _createBook(title, price)
    gBooks.push(newBook)
    _saveBooks()
}

function getBookById(bookId) {
    return gBooks.find(book => book.id === bookId)
}

function resetFilterBy() {
    gQueryOptions.filterBy.txt = ''
    gQueryOptions.filterBy.minRating = 0
}

function getExpensive() {
    return gBooks.filter(book => +book.price > 200).length
}

function getAvg() {
    return gBooks.filter(book => +book.price > 80 && +book.price <= 200).length
}

function getCheap() {
    return gBooks.filter(book => +book.price < 80).length
}

function updateRate(elBtn, bookId) {
    const book = getBookById(bookId)
    if (elBtn.innerText === '-' && book.rating > 0) book.rating--
    else if (elBtn.innerText === '+' && book.rating < 5) book.rating++
    _saveBooks()
}

function _createBooks() {
    gBooks = loadFromStorage('bookDB')

    if (!gBooks || !gBooks.length) {
        gBooks = [
            _createBook('Harry Potter', 200, harryPotterUrl),
            _createBook('The World', 150, worldUrl),
            _createBook('The Hunger Games', 100, hungerGamesUrl),
        ]
        _saveBooks()
    }
}

function _createBook(title, price, imgUrl = defaultUrl, rating = 0) {
    return {
        id: makeId(),
        title,
        price,
        imgUrl,
        rating
    }
}

function _saveBooks() {
    saveToStorage(BOOK_DB, gBooks)
}