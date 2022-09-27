let myLibrary = [];

function Book(title, author, pages, readStatus) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus

    this.info = function () {
        let status = undefined;
        if (this.readStatus === false) {
            status = " not read yet"
        }
        else {
            status = "have read"
        }

        const bookInfo = this.title + " by " + this.author + ", " + this.pages + " pages, " + status;

        return bookInfo;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);

const atomicHabits = new Book("Atomic Habits", "J.R.R. Tolkien", 200, true);

addBookToLibrary(theHobbit);
addBookToLibrary(atomicHabits);

let size = myLibrary.length;

for (let i = 0; i < size; i++) {
    console.table(myLibrary[i].info())
}


const newBookBtn = document.getElementById('newBookBtn');
const closeFormBtn = document.querySelector('.close-button');
const errorMsg = document.getElementById('errorMsg');

const addBookModal = document.getElementById('addBookModal');
const addBookForm = document.getElementById('addBookForm');


const overlay = document.getElementById('overlay');

overlay.addEventListener('click', () => {
    closeModal;
})

const openAddBookModal = () => {
    addBookForm.reset()
    addBookModal.classList.add('active')
    overlay.classList.add('active')
}

const closeModal = () => {
    addBookModal.classList.remove('active')
    overlay.classList.remove('active')
}

newBookBtn.onclick = openAddBookModal;
closeFormBtn.onclick = closeModal;
overlay.onclick = closeModal
