//Book Class: Represents a Book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI class: Handle UI Tasks
class UI {
    static displayBooks() {

       const books = Store.getBooks();

       books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    //we gat to ensure that what is clicked has the delete class --- using if statement
    //we make sure what is clicked contain the class delete 
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    //custom alert
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        //grab and put in
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        //Vanish in 3s
        setTimeout(() => document.querySelector('.alert').remove(), 1000);

    }


    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

//made it static so we dont have to instansiate the store class
// Store Class: Handles Storage
class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(isbn) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  

//NOTE: yu can't store object in local storage it has to be a string - so we stringify our object bfr sending to local storage & parse it when pulling it out;

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);


//Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //prevent actual submit
    e.preventDefault();

    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Validation
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill in all field', 'danger');
    }
    else{

         //instiantiate book
    const book = new Book(title, author, isbn);

    //add book to UI 
    UI.addBookToList(book);


    //add books to store

    Store.addBook(book);


    //show success msg <--Wright bfr clear fields-->
    UI.showAlert('Book Added', 'success');

    //this method clear fields
    UI.clearFields();
    }

   
});


//Events: Remove a Book
//we need to use event propagation
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);

    //show success msg:
    UI.showAlert('Book Removed', 'Success');
});



//event propagatin is when we select something above it and target whatever is clicked inside it

