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