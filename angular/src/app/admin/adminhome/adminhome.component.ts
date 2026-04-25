import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminHomeComponent {

  constructor(private router: Router) {}

  goToManageUsers() {
    this.router.navigate(['/admin/manage-user']);
  }

  goToManageComplaints() {
    this.router.navigate(['/admin/manage-complaints']);
  }

  goToCreateNews() {
    this.router.navigate(['/admin/create-news']);
  }

  goToCreateEvent() {
    this.router.navigate(['/admin/events']);
  }

  logout() {
    localStorage.clear();
    alert("Logged out successfully");
    this.router.navigate(['/login']);
  }

}