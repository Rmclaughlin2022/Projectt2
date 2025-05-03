document.getElementById("book-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;
    const imageInput = document.getElementById("book-image").files[0];

    if (title && author && pages) {
        const reader = new FileReader();
        reader.onload = function (e) {
            addBookToLibrary(title, author, pages, read, e.target.result);
        };
        if (imageInput) {
            reader.readAsDataURL(imageInput);
        } else {
            addBookToLibrary(title, author, pages, read, "images/book.jpg"); // Default image
        }
        this.reset();
    }
});

class Book {
    constructor(title, author, pages, read, image) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.image = image; 
    }
}

const myLibrary = [
    new Book("Zoltraak", "Qual", 45, "Read", "images/qual.avif"),
    new Book("Judradjim", "Frieren", 300, "Read", "images/Judradjim.jpg"),
    new Book("Daosdorg", "Denken", 210, "Read", "images/Denken.jpg"),
];

const addBookButton = document.getElementById("add-book-button");
const bookForm = document.getElementById("book-form");

addBookButton.addEventListener("click", () => {
    bookForm.style.display = bookForm.style.display === "none" ? "block" : "none";
});

function addBookToLibrary(title, author, pages, read, image) {
    const newBook = new Book(title, author, pages, read, image);
    myLibrary.push(newBook);
    renderLibrary();
    bookForm.style.display = "none";
    showPopup();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    renderLibrary();
}

function toggleRead(index) {
    myLibrary[index].read = myLibrary[index].read === "Read" ? "Not Read" : "Read";
    renderLibrary();
}

function renderLibrary() {
    const libraryEl = document.getElementById("library");
    libraryEl.innerHTML = ""; 

    myLibrary.forEach((book, index) => {
        const template = document.getElementById("book-template");
        const bookClone = template.content.cloneNode(true);
        

        const bookCard = bookClone.querySelector(".book-item"); 
        if (bookCard) {
            bookCard.style.backgroundImage = `url(${book.image})`;
            bookCard.style.backgroundSize = "cover";  
            bookCard.style.backgroundPosition = "center";  
            bookCard.style.backgroundRepeat = "no-repeat"; 
        }

        const bookInfo = bookClone.querySelector(".book-info");
        bookInfo.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read}`;

        // Remove extra <img> tag - it's unnecessary
        // const img = document.createElement("img");
        // img.src = book.image;
        // img.alt = book.title;
        // img.style.maxWidth = "200px";
        // bookInfo.appendChild(img);

        const toggleBtn = bookClone.querySelector(".toggle-read");
        toggleBtn.addEventListener("click", () => toggleRead(index));

        const deleteBtn = bookClone.querySelector(".delete-book");
        deleteBtn.addEventListener("click", () => removeBook(index));

        libraryEl.appendChild(bookClone);
    });
}
renderLibrary();

const popup = document.createElement("div");
popup = false;
popup.classList.add("popup");
popup.innerHTML = '<img src="images/seriereadalready.jpg" alt="Book Added">';
document.body.appendChild(popup);

function showPopup() {
    popup.style.display = "block";
    popup.style.opacity = "1";
    setTimeout(() => {
        popup.style.opacity = "0"; 
        setTimeout(() => {
            popup.style.display = "none"; 
        }, 1000);
    }, 5000);
}

document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-book-button");
    const bookForm = document.getElementById("book-form");
    const overlay = document.getElementById("overlay");

    addButton.addEventListener("click", function () {
        bookForm.style.display = "block";
        overlay.style.display = "block";
    });

    overlay.addEventListener("click", function () {
        bookForm.style.display = "none";
        overlay.style.display = "none";
    });
});

