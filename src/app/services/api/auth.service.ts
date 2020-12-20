import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './../storage/storage.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiBaseURL = environment.apiBaseURL;
  constructor(
    private storageService: StorageService,
    private http: HttpClient
  ) {}
  /**
   * Http request to receive a JWT if user credentials are valid.
   * @param email E-Mail of the user.
   * @param password Password of the user.
   */
  getToken(email: string, password: string): Observable<any> {
    // prepare the HTTP Authorization header
    // Basic authentication, username / password are separated by : and base64 encoded
    let authInfo = 'Basic ' + window.btoa(email + ':' + password);

    // call the API
    return this.http.get<any>(`${this.apiBaseURL}/auth/token`, {
      headers: new HttpHeaders().set('Authorization', authInfo),
    });
  }
  /**
   * Http request to authenticate with JWT token.
   */
  postToken(): Observable<null> {
    return this.http.post<null>(
      `${this.apiBaseURL}/auth/token`,
      {},
      {
        headers: this.createJwtAuthHeader(),
      }
    );
  }

  /**
   * Deletes JWT token in local storage.
   */
  deleteToken = () => {
    this.storageService.logout();
  };

  /**
   * Creates a JWT header for all kinds of requests where a authentication is necessary.
   */
  createJwtAuthHeader = (): HttpHeaders => {
    // JWT authentication, provide the token
    let token = this.storageService.getToken();

    // if there is no token in the store we will send an empty string to the server
    // an will receive a 401 Unauthorized
    let authInfo = `JWT ${token}`;

    return new HttpHeaders().set('Authorization', authInfo);
  };
}
