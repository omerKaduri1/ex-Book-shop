'use strict'

function onInit() {
    render()
}

function render() {
    const books = getBooks()
    const elBookList = document.querySelector('.books-list tbody')
    if (!books.length) {
        elBookList.innerHTML = 'No matching books were found...'
    } else {
        const strHTMLs = books.map(book => `
           <tr>
              <td class="title">${book.title}</td>
              <td class="price">${book.price}</td>
              <td class="actions">
                 <button class="read-btn" onclick="onReadBook('${book.id}')">Read</button>
                 <button class="update-btn" onclick="onUpdateBook('${book.id}', '${book.price}')">Update</button>
                 <button class="delete-btn" onclick="onRemoveBook('${book.id}')">Delete</button>
              </td>
           </tr>
        `)

        elBookList.innerHTML = strHTMLs.join('')
    }

    renderStats()
}

function onRemoveBook(bookId) {
    var book = getBookById(bookId)
    removeBook(bookId)
    render()
    var msg = `${book.title} was deleted successfully!`
    onSuccessModal(msg)
}

function onUpdateBook(bookId, bookPrice) {
    var book = getBookById(bookId)
    const newPrice = prompt('Enter new book\'s price', bookPrice)
    updatePrice(bookId, newPrice)
    render()
    if (newPrice === bookPrice) return
    var msg = `Book price updated successfully,
    ${book.title} price is ${book.price}.`
    onSuccessModal(msg, bookId)
}
const gElNewBookModal = document.querySelector('.add-book')

function onAddBook() {
    gElNewBookModal.showModal()
}

function onConfirmClick() {
    const elNewName = gElNewBookModal.querySelector('.book-name')
    const elNewPrice = gElNewBookModal.querySelector('.book-price')
    const newBookTitle = elNewName.value
    const newBookPrice = elNewPrice.value
    addBook(newBookTitle, newBookPrice)
    render()
    var msg = `${newBookTitle} was added successfully!
    it's price is ${newBookPrice}.`
    onSuccessModal(msg)
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

function onSetFilter(elSearch) {
    const filterBy = elSearch.value
    setFilterBy(filterBy)
    render()
}

function onClear() {
    const elSearch = document.querySelector('.filter input')
    elSearch.value = ''
    resetFilterBy()
    render()
}

function onSuccessModal(msg, bookId) {
    const book = getBookById(bookId)

    const elSuccessModal = document.querySelector('.success-msg')
    const elMsg = elSuccessModal.querySelector('h3')
    const elBookImg = elSuccessModal.querySelector('img')

    elMsg.innerText = msg

    elSuccessModal.showModal()
    setTimeout(() => {
        elSuccessModal.close()
    }, 2000);
}

function renderStats() {
    const elExpensive = document.querySelector('.expensive')
    const elAvg = document.querySelector('.avg')
    const elCheap = document.querySelector('.cheap')

    elExpensive.innerText = getExpensive()
    elAvg.innerText = getAvg()
    elCheap.innerText = getCheap()
}