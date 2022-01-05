// Select the Elements
const container = document.querySelector(".books-container");
const addBtn = document.querySelector("form");
const titleInput = document.querySelector(".title-input");
const authorInput = document.querySelector(".author-input");

// Class of Books
class Books {
  static books = [];

  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  // Data Storage
  static storage(books) {
    localStorage.setItem("books", JSON.stringify(books));
  }

  addBook() {
    Books.books.push(this);
    Books.storage(Books.books);
  }

  // Display Book
  static displayBook() {
    if (!JSON.parse(localStorage.getItem("books"))) {
      Books.books = [];
    } else {
      Books.books = JSON.parse(localStorage.getItem("books"));
    }

    let itemHtml = "";
    Books.books.forEach((book) => {
      itemHtml += `
      <li class="book" id="${book.id}">
        <div class="book-details">${book.title} by ${book.author}</div>
        <button type="button" class="remove-btn">Remove</button>
      </li>
    `;
    });

    container.innerHTML = itemHtml;

    // Remove: when I click on Remove button
    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log();
        const targetId = e.target.parentElement.id;
        Books.books = Books.books.filter((book) => book.id !== +targetId);
        Books.storage(Books.books);
        e.target.parentElement.remove();
      });
    });
  }
}

let id = 0;

// Add: when I click on Add button
addBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;

  const newBook = new Books(id, title, author);
  newBook.addBook();
  Books.displayBook();
  id += 1;
});

// Display Data: when reload the page
window.onload = () => {
  Books.displayBook();
};
