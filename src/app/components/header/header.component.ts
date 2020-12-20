import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {}
  /**
   * Deletes JWT in local storage.
   */
  logout = () => {
    this.storageService.logout();
    this.router.navigate(['/login']);
  };
}
