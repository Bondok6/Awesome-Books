let books = [];
let id = 0;

const Books = function (title, author, id) {
  this.title = title;
  this.author = author;
  this.id = id;
};

// Select the Elements
const container = document.querySelector('.books-container');
const addBtn = document.querySelector('form');

const titleInput = document.querySelector('.title-input');
const authorInput = document.querySelector('.author-input');

// Data Storage
const storage = function (books) {
  localStorage.setItem('books', JSON.stringify(books));
};

// Add Book
const addBook = function (title, author, id) {
  const newBook = new Books(title, author, id);
  books.push(newBook);
  storage(books);
};

// Remove Book
const removeBook = function (id) {
  books = books.filter((book) => book.id !== +id);
  storage(books);
};

// Display Book
const displayBook = function () {
  if (!JSON.parse(localStorage.getItem('books'))) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  let itemHtml = '';
  books.forEach((book) => {
    itemHtml += `
      <li class="book" id="${book.id}">
        <div class="title">${book.title}</div>
        <div class="author">${book.author}</div>
        <button type="button" class="remove-btn">Remove</button>
      </li>
    `;
  });

  container.innerHTML = itemHtml;

  // Remove: when I click on Remove button
  document.querySelectorAll('.remove-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const targetId = e.target.parentElement.id;
      removeBook(targetId);
      e.target.parentElement.remove();
    });
  });
};

// Add: when I click on Add button
addBtn.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;

  addBook(title, author, id);
  displayBook();
  id += 1;
});

// Display Data: when reload the page
window.onload = () => {
  displayBook();
};
