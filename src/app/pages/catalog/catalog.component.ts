import { Component, OnInit } from '@angular/core';

import { BooksService } from '../../services/api/books.service';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  books: Array<any>;
  myBooks: Array<any>;
  isLibrarian: boolean = false;
  maxBorrow: boolean = false;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.getBooks();
    this.getMyBooks();
  }
  /**
   * Sends a request to DB to borrow a book.
   */
  borrow = (title: string): void => {
    this.booksService.borrowBook(title).subscribe(
      (date) => {
        this.getBooks();
        this.getMyBooks();
      },
      (err) => {}
    );
  };
  /**
   *  Sends a request to DB delete a book, only accessible by librarian.
   * @param  title Title of book to be deleted.
   */
  delete = (title: string): void => {
    //Request to delete book only accessible by librarian.
    this.booksService.deleteBook(title).subscribe(
      (data) => {
        this.getBooks();
        this.getMyBooks();
      },
      (err) => {}
    );
  };
  /**
   * Get all books the logged in user borrowed.
   */
  getMyBooks = () => {
    this.booksService.getMyBooks().subscribe(
      (data) => {
        if (data.books.length > 2) {
          this.maxBorrow = true;
        } else {
          this.maxBorrow = false;
        }
        this.myBooks = data.books;
      },
      (err) => {}
    );
  };

  /**
   * Get all books from DB.
   */
  getBooks = () => {
    this.booksService.getBooks().subscribe(
      (data) => {
        if (data.role == 'librarian') this.isLibrarian = true;
        this.books = data.books;
      },
      (err) => {}
    );
  };
  /**
   * User returns a book.
   * @param title Title of the book to be returned.
   */
  return = (title: string) => {
    this.booksService.returnBook(title).subscribe(
      (data) => {
        this.getBooks();
        this.getMyBooks();
      },
      (err) => {}
    );
  };
}
