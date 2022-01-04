"use strict";

let books = [];

const Books = function (title, author) {
  this.title = title;
  this.author = author;
};

// Select the Elements
const container = document.querySelector(".books-container");
const addBtn = document.querySelector(".add-btn");

const titleInput = document.querySelector(".title-input");
const authorInput = document.querySelector(".author-input");

// Add Book
const addBook = function (title, author) {
  const newBook = new Books(title, author);
  books.push(newBook);
};

// Remove Book
const removeBook = function (title) {
  books = books.filter((book) => book.title !== title);
};

// Display Book
const displayBook = function () {
  let itemHtml = `
  <li class="book">
    <div class="title">${books[books.length - 1].title}</div>
    <div class="author">${books[books.length - 1].author}</div>
    <button type="button" class="remove-btn">Remove</button>
  </li>
`;

  container.insertAdjacentHTML("beforeend", itemHtml);

  //Remove when I click on Remove button
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let targetTitle =
        e.target.parentElement.firstChild.nextSibling.textContent;
      console.log(targetTitle);
      removeBook(targetTitle);
      e.target.parentElement.remove();
    });
  });
};

// Add when I click on Add button
addBtn.addEventListener("click", (e) => {
  let title = titleInput.value;
  let author = authorInput.value;
  addBook(title, author);
  displayBook();
});
