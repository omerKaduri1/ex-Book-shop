'use strict'

function onInit() {
    render()
}

function render() {
    const books = getBooks()
    const strHTMLs = books.map(book => `
       <tr>
          <td class="title">${book.title}</td>
          <td class="price">${book.price}</td>
          <td class="actions">
             <button class="read-bth" onclick="onReadBook('${book.id}')">Read</button>
             <button class="update-btn" onclick="onUpdateBook('${book.id}', '${book.price}')">Update</button>
             <button class="delete-btn" onclick="onRemoveBook('${book.id}')">Delete</button>
          </td>
       </tr>
    `)

    const elBookList = document.querySelector('.books-list tbody')
    elBookList.innerHTML = strHTMLs.join('')
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    render()
}

function onUpdateBook(bookId, bookPrice) {
    const newPrice = +prompt('Enter new book\'s price', bookPrice)
    updatePrice(bookId, newPrice)
    render()
}

function onAddBook() {
    const newBookTitle = prompt('Enter book\'s name')
    const newBookPrice = +prompt('Enter book\'s price')
    addBook(newBookTitle, newBookPrice)
    render()
}

function onReadBook(bookId) {
    const book = getBookById(bookId)

    const elBookDetails = document.querySelector('.book-details')
    const elTitle = elBookDetails.querySelector('h2')
    const elPriceSpan = elBookDetails.querySelector('h3 span')
    const elBookImg = elBookDetails.querySelector('img')

    elTitle.innerText = book.title
    elPriceSpan.innerText = book.price
    elBookImg.src = book.imgUrl

    elBookDetails.showModal()
}