'use strict'

const BOOK_DB = 'bookDB'
var harryPotterUrl = 'https://wizkids.co.il/cdn/shop/products/02e5ee995b80d61e09a9849df5c83513_x700.gif?v=1514210286'
var worldUrl = 'https://shop.lonelyplanet.com/cdn/shop/products/the-world-lonely-planet-s-guide-to_900x.jpg?v=1667661690'
var hungerGamesUrl = 'https://wizkids.co.il/cdn/shop/products/9780439023528_x700.jpg?v=1570375084'
var defaultUrl = 'https://wizkids.co.il/cdn/shop/products/Itstartswithus_x700.jpg?v=1669823430'

var gBooks = [
    {
        id: makeId(),
        title: 'Harry Potter',
        price: 200,
        imgUrl: harryPotterUrl
    },
    {
        id: makeId(),
        title: 'The World',
        price: 150,
        imgUrl: worldUrl
    },
    {
        id: makeId(),
        title: 'The Hunger Games',
        price: 100,
        imgUrl: hungerGamesUrl
    }
]

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
    const newBook = _createBook(title, price)
    gBooks.unshift(newBook)
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

function _createBook(title, price = 100, imgUrl = defaultUrl) {
    return {
        id: makeId(),
        title,
        price,
        imgUrl
    }
}
