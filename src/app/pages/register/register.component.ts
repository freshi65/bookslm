import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../services/api/users.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userData = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'user',
  };
  error: any;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {}
  /**
   * Adds user to DB if email isn't already taken. Sets error variable for user feedback.
   */
  onSubmit() {
    this.usersService.postUser(this.userData).subscribe(
      () => this.router.navigate(['/login']),
      (err) => {
        if (err.status == 409) {
          this.error = 'This e-mail is already taken';
        } else {
          this.error = 'something went horribly wrong';
        }
      }
    );
  }
}
