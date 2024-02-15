'use strict'

var gBooks = [
    {
        id: makeId(),
        title: 'Harry Potter',
        price: 200,
        imgUrl: 'img/Harry-potter.webp'
    },
    {
        id: makeId(),
        title: 'The World',
        price: 150,
        imgUrl: 'img/the-world.webp'
    },
    {
        id: makeId(),
        title: 'The Hunger Games',
        price: 100,
        imgUrl: 'img/the-hunger-games.webp'
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