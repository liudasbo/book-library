let myLibrary = [
    {
        title: "The Hunger Games",
        authors: "Suzanne Collins",
        pages: 374,
        read: false,
    },
    {
        title: "The Godfather",
        authors: "Mario Puzo",
        pages: 433,
        read: true,
    },
];

function saveToLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function loadFromLocalStorage() {
    const storedLibrary = localStorage.getItem('myLibrary');
    if (storedLibrary) {
        myLibrary = JSON.parse(storedLibrary);
    }
}

window.onload = function() {
    loadFromLocalStorage();
    displayBooks();
};


function Book(title, authors, pages, read) {
  this.title = title;
  this.authors = authors;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, authors, pages, read) {
  const newBook = new Book(title, authors, pages, read);

  myLibrary.push(newBook);

  saveToLocalStorage();

  displayBooks();
}

function displayBooks() {

    if (!myLibrary.length) {
        document.getElementsByTagName('tfoot')[0].classList.remove('hiden');
    } else {
        document.getElementsByTagName('tfoot')[0].classList.add('hiden');
    }
    
    const library = document.getElementById('library')
    let bookRow = '';

    myLibrary.forEach((book) => {
        bookRow += `
            <tr>
                <td>${book.title}</td>
                <td>${book.authors}</td>
                <td>${book.pages}</td>
                <td><button class="readBtn">${book.read ? `read` : `not read`}</button></td>
                <td><button class="deleteBtn">delete</button></td>
            </tr>
        `;
    })

    library.innerHTML = bookRow;

    const readButtons = document.querySelectorAll('.readBtn');
    readButtons.forEach((button, index) => {
        button.addEventListener('click', () => toggleBookStatus(index))
    })

    const deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach((button, index) => {
        button.addEventListener('click', () => deleteBook(index))
    })
}

function toggleBookStatus(index) {
    myLibrary[index].read = myLibrary[index].read === true ? false : true;
    saveToLocalStorage();
    displayBooks();
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    saveToLocalStorage();
    displayBooks();
}

const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const authors = document.getElementById('authors').value;
    const pages = document.getElementById('pages').value;

    const readValue = document.getElementById('read').value;
    const read = readValue === "true";

    if (!title.length || !authors.length || !pages.length) {
        alert('Please fill all inputs');
    } else {
        addBookToLibrary(title, authors, pages, read);
    }
})