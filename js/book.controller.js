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
             <button>Read</button>
             <button onclick="onUpdateBook('${book.id}')">Update</button>
             <button onclick="onRemoveBook('${book.id}')">Delete</button>
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

function onUpdateBook(bookId) {
    const newPrice = +prompt('Enter new book\'s price', )
    updatePrice(bookId, newPrice)
    render()
}

function onAddBook() {
    const newBookTitle = prompt('Enter book\'s name')
    const newBookPrice = +prompt('Enter book\'s price')
    addBook(newBookTitle, newBookPrice)
    render()
}