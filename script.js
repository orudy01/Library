let myLibrary = [];

class Book {
    constructor(title, author, pages, readStatus) {

        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;

        this.info = function () {
            let status = undefined;
            if (this.readStatus === false) {
                status = " not read yet";
            }
            else {
                status = "have read";
            }

            const bookInfo = this.title + " by " + this.author + ", " + this.pages + " pages, " + status;

            return bookInfo;
        };
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function removeBookByTitile(bookName) {
    let size = myLibrary.length;
    for (let i = 0; i < size; i++) {
        if (myLibrary[i].title === bookName) {
            myLibrary.splice(i, 1);
        }
    }
}

function changeStatusByTitile(bookName) {
    let size = myLibrary.length;
    for (let i = 0; i < size; i++) {
        if (myLibrary[i].title === bookName) {
            console.log(myLibrary[i].readStatus);
            myLibrary[i].readStatus = !myLibrary[i].readStatus;
            console.log(myLibrary[i].readStatus);
        }
    }
}



const theHobbit = new Book("Fire & Blood", "George R.R Martin", 719, true);

const atomicHabits = new Book("Atomic Habits", "James Clear", 319, false);



addBookToLibrary(theHobbit);
addBookToLibrary(atomicHabits);


const newBookBtn = document.getElementById('newBookBtn');
const closeFormBtn = document.querySelector('.close-button');

const addBookModal = document.getElementById('addBookModal');
const addBookForm = document.getElementById('addBookForm');

const posts = document.querySelector(".library-container")
console.log(posts)

const title = document.getElementById('title');
const author = document.getElementById('author');
const number = document.getElementById('number');
const isRead = document.getElementById('isRead')

const overlay = document.getElementById('overlay');

let data = {}; //data from input field will go into this object


//MODAL
const openAddBookModal = () => {
    addBookForm.reset()
    addBookModal.classList.add('active')
    overlay.classList.add('active')
}

const closeModal = () => {
    addBookModal.classList.remove('active')
    overlay.classList.remove('active')
}

overlay.addEventListener('click', () => {
    closeModal;
})
//

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("button clicked")

    formValidation();
})

let formValidation = () => {
    closeModal();
    collectData();
    checkData(data);
}

let collectData = () => {
    data['title'] = title.value;
    data['author'] = author.value;
    data['pages'] = pages.value;
    data['readStatus'] = isRead.checked
    console.log(isRead.checked);
}

let checkData = (data) => {
    let size = myLibrary.length;
    for (let i = 0; i < size; i++) {
        if (data.title === myLibrary[i].title) {
            console.log("Book is already in the library")
            return;
        }
    }
    acceptData(data);
}

let acceptData = (data) => {
    let newBook = new Book(data.title, data.author, data.pages, data.readStatus)
    createBookPost(newBook);
    myLibrary.push(newBook);
}

let createBookPost = (book) => {

    const div = document.createElement('div');
    div.classList.add('sample-book');

    div.innerHTML += `<div>
    <h2>${book.title}</h2> 
    <p>${book.author}</p>
    <p>${book.pages}</p>
    </div>`;

    const rightSideDiv = document.createElement('div');

    const bookBtn = document.createElement('button');
    bookBtn.classList.add('button');

    div.addEventListener("click", tableClickHandler);

    if (book.readStatus) {
        bookBtn.textContent = 'Finished'
        bookBtn.classList.add('btn-finished')
    }
    else {
        bookBtn.textContent = 'Not Read'
    }

    rightSideDiv.appendChild(bookBtn);

    const optionSpan = document.createElement('span');

    optionSpan.innerHTML += `
    <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>`;

    rightSideDiv.append(optionSpan);

    div.append(rightSideDiv);

    posts.append(div);
}

let deletePost = (e) => {

    let bookContainer = e.parentElement.parentElement.previousSibling;
    let title = bookContainer.firstElementChild.textContent;

    removeBookByTitile(title);

    e.parentElement.parentElement.parentElement.remove();
}


let tableClickHandler = (event) => {
    let btnClicked = event.target.closest('.button');
    console.log(btnClicked);
    if (btnClicked) {
        toggleText(btnClicked)
    }
}

let toggleText = (b) => {

    let textDiv = b.parentElement.previousSibling;
    let title = textDiv.firstElementChild.textContent;

    console.log(title);
    changeStatusByTitile(title);

    if (b.innerText == "Finished") {
        b.innerText = "Not Read";
        b.classList.remove('btn-finished')
    }
    else {
        b.innerText = "Finished";
        b.classList.add('btn-finished')
    }
}

let clearLibrary = () => {
    posts.innerHTML="";
}

let loadLibrary = () => {
    clearLibrary();
    let size = myLibrary.length;
    for (let i = 0; i < size; i++) {
        createBookPost(myLibrary[i])
    }
}

let loadCompleted = () => {
    clearLibrary();
    let size = myLibrary.length;
    for (let i = 0; i < size; i++) {
        if (myLibrary[i].readStatus === true) {
            createBookPost(myLibrary[i])
        }
    }
}

let loadNeedToRead = () => {
    clearLibrary();
    let size = myLibrary.length;
    for (let i = 0; i < size; i++) {
        if (myLibrary[i].readStatus === false) {
            createBookPost(myLibrary[i])
        }
    }
}

loadLibrary();
newBookBtn.onclick = openAddBookModal;
closeFormBtn.onclick = closeModal;
overlay.onclick = closeModal
