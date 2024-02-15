'use strict'

var harryPotterUrl = 'https://wizkids.co.il/cdn/shop/products/02e5ee995b80d61e09a9849df5c83513_x700.gif?v=1514210286'
var worldUrl = 'https://shop.lonelyplanet.com/cdn/shop/products/the-world-lonely-planet-s-guide-to_900x.jpg?v=1667661690'
var hungerGamesUrl = 'https://wizkids.co.il/cdn/shop/products/9780439023528_x700.jpg?v=1570375084'
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