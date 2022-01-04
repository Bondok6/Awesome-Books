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

// Data Storage
const storage = function (books) {
  localStorage.setItem("books", JSON.stringify(books));
};

// Add Book
const addBook = function (title, author) {
  const newBook = new Books(title, author);
  books.push(newBook);
  storage(books);
};

// Remove Book
const removeBook = function (title) {
  books = books.filter((book) => book.title !== title);
  storage(books);
};

// Display Book
const displayBook = function () {
  books = JSON.parse(localStorage.getItem("books"));

  let itemHtml = ``;
  books.forEach((book) => {
    itemHtml += `
    <li class="book">
      <div class="title">${book.title}</div>
      <div class="author">${book.author}</div>
      <button type="button" class="remove-btn">Remove</button>
    </li>
  `;
  });

  container.innerHTML = itemHtml;

  //Remove when I click on Remove button
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let targetTitle =
        e.target.parentElement.firstChild.nextSibling.textContent;
      removeBook(targetTitle);
      e.target.parentElement.remove();
    });
  });
};

// Add when I click on Add button
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let title = titleInput.value;
  let author = authorInput.value;
  addBook(title, author);
  displayBook();
});

window.onload = () => {
  displayBook();
};
