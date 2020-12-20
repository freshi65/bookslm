import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiBaseURL = environment.apiBaseURL;
  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Http request to receive all books.
   */
  getBooks(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseURL}/books`, {
      headers: this.authService.createJwtAuthHeader(),
    });
  }
  getMyBooks(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseURL}/books/myBooks`, {
      headers: this.authService.createJwtAuthHeader(),
    });
  }
  /**
   * Http request to delete a book.
   * @param title title of a book to be deleted.
   */
  deleteBook(title: string): Observable<any> {
    return this.http.delete<any>(`${this.apiBaseURL}/books/delete`, {
      headers: this.authService.createJwtAuthHeader(),
      params: { title: title },
    });
  }
  /**
   * Http request to add a new book to DB.
   * @param book Object which contains book data.
   */
  addBook(book: Object): Observable<any> {
    return this.http.post<any>(`${this.apiBaseURL}/books/add`, book, {
      headers: this.authService.createJwtAuthHeader(),
    });
  }
  /**
   * Http request to borrow a Book.
   * @param title Title of book to borrow.
   */
  borrowBook(title: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiBaseURL}/books/borrow`,
      { title: title },
      {
        headers: this.authService.createJwtAuthHeader(),
      }
    );
  }
  /**
   * Http request to return a users book.
   * @param title Title of book to be returned.
   */
  returnBook(title: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiBaseURL}/books/return`,
      { title: title },
      {
        headers: this.authService.createJwtAuthHeader(),
      }
    );
  }
}
