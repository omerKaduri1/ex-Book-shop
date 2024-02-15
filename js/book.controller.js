'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    const books = getBooks()
    const strHTMLs = books.map(book => `
    <tr>
       <td>${book.title}</td>
       <td>${book.price}</td>
       <td>
          <button>Read</button>
          <button>Update</button>
          <button>Delete</button>
       </td>
    </tr>
    `)
}