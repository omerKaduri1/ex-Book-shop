'use strict'

const gElNewBookModal = document.querySelector('.add-book')

const gQueryOptions = {
    filterBy: { txt: '', minRating: 0 },
    sortBy: {},
    page: { idx: 0, size: 5 }

}
function onInit() {
    readQueryParams()
    render()
}

function render() {
    const books = getBooks(gQueryOptions)
    const elBookList = document.querySelector('.books-list tbody')
    if (!books.length) {
        elBookList.innerHTML = `<tr> No matching books were found...</tr>`
    } else {
        const strHTMLs = books.map(book => `
           <tr>
              <td class="title">${book.title}</td>
              <td class="price">$${book.price}</td>
              <td> ${book.rating} </td>
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
    setQueryParams()
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
    ${book.title} price is $${book.price}.`
    onSuccessModal(msg, bookId)
}

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
    if (!newBookTitle || !newBookPrice) return
    var msg = `${newBookTitle} was added successfully!
    it's price is $${newBookPrice}.`
    onSuccessModal(msg)
    elNewName.value = ''
    elNewPrice.value = ''
}

function onReadBook(bookId) {
    const book = getBookById(bookId)

    const elBookDetails = document.querySelector('.book-details')
    const elTitle = elBookDetails.querySelector('h2')
    const elPriceSpan = elBookDetails.querySelector('h3 span')
    const elBookImg = elBookDetails.querySelector('img')
    const elRate = elBookDetails.querySelector('.rate')

    elTitle.innerText = book.title
    elPriceSpan.innerText = book.price
    elBookImg.src = book.imgUrl
    elRate.innerHTML = `Rating: <button onclick="onUpdateRate(event, this, '${book.id}')">-</button><span></span><button onclick="onUpdateRate(event, this, '${book.id}')">+</button></h3>`

    const elRateSpan = elRate.querySelector('span')
    elRateSpan.innerText = book.rating

    elBookDetails.showModal()
}

function onSetFilter() {
    const elTitle = document.querySelector('.filter-by-title')
    const elRating = document.querySelector('.filter-by-rating')

    gQueryOptions.filterBy.txt = elTitle.value
    gQueryOptions.filterBy.minRating = +elRating.value

    gQueryOptions.page.idx = 0
    render()
}

function onSetSortBy() {
    const elSortBy = document.querySelector('.sort-by select')
    const elDir = document.querySelector('input[name="direction"]:checked')

    var dir = +elDir.value

    gQueryOptions.sortBy = {}
    gQueryOptions.sortBy[elSortBy.value] = dir

    gQueryOptions.page.idx = 0
    render()
}

function onPrevPage() {
    const totalPageCount = getTotalPageCount(gQueryOptions)

    if (gQueryOptions.page.idx > 0) {
        gQueryOptions.page.idx--
    } else {
        gQueryOptions.page.idx = totalPageCount - 1
    }
    render()
}

function onNextPage() {
    const totalPageCount = getTotalPageCount(gQueryOptions)

    if (gQueryOptions.page.idx < totalPageCount - 1) {
        gQueryOptions.page.idx++
    } else {
        gQueryOptions.page.idx = 0
    }
    render()
}

function onClear() {
    const elTitle = document.querySelector('.filter-by-title')
    const elRating = document.querySelector('.filter-by-rating')

    elTitle.value = ''
    elRating.value = 0
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

function onUpdateRate(ev, elBtn, bookId) {
    ev.preventDefault()
    const elRateSpan = document.querySelector('.rate span')
    if (elBtn.innerText === '-' && elRateSpan.innerText > 0) elRateSpan.innerText--
    else if (elBtn.innerText === '+' && elRateSpan.innerText < 5) elRateSpan.innerText++
    elRateSpan.innerText += ''
    updateRate(elBtn, bookId)
    render()
}

function readQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)
    gQueryOptions.filterBy = {
        txt: queryParams.get('title') || '',
        minRating: +queryParams.get('minRating') || 0
    }

    // if (queryParams.get('sortBy')) {
    //     const prop = queryParams.get('sortBy')
    //     const dir = +queryParams.get('sortDir')
    //     gQueryOptions.sortBy[prop] = dir
    // }

    // if (queryParams.get('pageIdx')) {
    //     gQueryOptions.page.idx = +queryParams.get('pageIdx')
    //     gQueryOptions.page.size = +queryParams.get('pageSize')
    // }
    renderQueryParams()
}

function renderQueryParams() {

    document.querySelector('.filter-by-title').value = gQueryOptions.filterBy.txt
    document.querySelector('.filter-by-rating').value = gQueryOptions.filterBy.minRating

    // const sortKeys = Object.keys(gQueryOptions.sortBy)
    // const sortBy = sortKeys[0]
    // const dir = gQueryOptions.sortBy[sortKeys[0]]

    // document.querySelector('.sort-by select').value = sortBy || ''
    // document.querySelector('.sort-by input').checked = (dir === -1) ? true : false
}

function setQueryParams() {
    const queryParams = new URLSearchParams()

    queryParams.set('title', gQueryOptions.filterBy.txt)
    queryParams.set('minRating', gQueryOptions.filterBy.minRating)

    // const sortKeys = Object.keys(gQueryOptions.sortBy)
    // if (sortKeys.length) {
    //     queryParams.set('sortBy', sortKeys[0])
    //     queryParams.set('sortDir', gQueryOptions.sortBy[sortKeys[0]])
    // }

    // if (gQueryOptions.page) {
    //     queryParams.set('pageIdx', gQueryOptions.page.idx)
    //     queryParams.set('pageSize', gQueryOptions.page.size)
    // }

    const newUrl =
        window.location.protocol + "//" +
        window.location.host +
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)
}
