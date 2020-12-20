import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/api/auth.service';
import { StorageService } from '../../services/storage/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  email: string = '';
  password: string = '';
  ngOnInit(): void {
    //If user has valid token navigate to catalog.
    this.authService.postToken().subscribe(() => {
      this.router.navigate(['/catalog']);
    });
  }

  /**
   * Login with credentials email, password.
   * Saves JWT in local storage if Login was successful.
   */
  onSubmit() {
    this.authService.getToken(this.email, this.password).subscribe(
      (data) => {
        this.storageService.setToken(data.token);
        this.router.navigate(['/catalog']);
      },
      (err) => {}
    );
  }
}
