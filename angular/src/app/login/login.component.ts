import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = ""; 
  password: string = "";

  constructor(private srv: ApiService, private router: Router) {}

  onClickSubmit(result: { username: string; password: string }) { 

    if (!result.username || !result.password) {
      alert("Please enter both Username and Password.");
      return;
    }

    const username = result.username.trim();
    const password = result.password.trim();

    // ADMIN LOGIN
    if (username === "Admin" && password === "admin123") {

      localStorage.setItem("role", "admin");
      localStorage.setItem("user", JSON.stringify({
        name: "Admin"
      }));

      alert("Admin Login Successful...");
      this.router.navigateByUrl('/admin/home');
      return;
    }

    // USER LOGIN
    this.srv.getlogdata(username).subscribe({
      next: (dt: any[]) => {

        if (dt.length === 0) {
          alert("Invalid User Name...");
        } 
        else {
          const user = dt[0];

          // ✅ BLOCK CHECK (NEW ADD)
          if (user.status === 'blocked') {
            alert("Your account has been blocked by admin. Please contact support.");
            return;
          }

          if (user.password === password) {

            localStorage.setItem("role", "user");
            localStorage.setItem("user", JSON.stringify({
              name: user.fullname
            }));

            alert("User Login Successful...");
            this.router.navigateByUrl('/service');

          } 
          else {
            alert("Invalid Password...");
          }
        }
      },

      error: (err) => {
        alert("Something went wrong. Please try again!");
        console.error(err);
      }
    });
  }
}