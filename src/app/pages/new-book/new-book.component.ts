import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/api/books.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css'],
})
export class NewBookComponent implements OnInit {
  constructor(private booksService: BooksService, private router: Router) {}
  bookData = {
    title: '',
    author: '',
    publisher: '',
    published: '',
    borrowed: false,
  };
  error: any;

  ngOnInit(): void {}

  /**
   *  Add a new book to DB if title doesn't already exists. Sets error variable to show feedback.
   */
  onSubmit = () => {
    this.booksService.addBook(this.bookData).subscribe(
      (data) => {
        this.router.navigate(['/catalog']);
      },
      (err) => {
        if (err.status == 409) {
          this.error = 'This title is already taken';
        } else {
          this.error = 'something went horribly wrong';
        }
      }
    );
  };
}
