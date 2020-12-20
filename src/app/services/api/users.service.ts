import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiBaseURL = environment.apiBaseURL;
  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Http request to register a new user.
   * @param userData User data.
   */
  postUser(userData): Observable<any> {
    return this.http.post<any>(`${this.apiBaseURL}/users/register`, userData, {
      headers: this.authService.createJwtAuthHeader(),
    });
  }
}
