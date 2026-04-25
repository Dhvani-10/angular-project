import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(private router: Router) {

    this.router.events.subscribe(() => {
      this.checkLogin();
    });

    this.checkLogin();
  }

  checkLogin() {
    const user = localStorage.getItem('user');

    if (user && user !== "undefined") {
      const parsed = JSON.parse(user);
      this.isLoggedIn = true;
      this.userName = parsed.name || 'User';
    } else {
      this.isLoggedIn = false;
      this.userName = '';
    }
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}