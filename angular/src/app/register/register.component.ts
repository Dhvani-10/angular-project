import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  data: any;
  maxDate: string = '';

  constructor(private srv: ApiService, private router: Router) {}

  ngOnInit() {
    const today = new Date();
    today.setDate(today.getDate() - 1); 
    this.maxDate = today.toISOString().split('T')[0];
  }

  formatAadhaar(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    value = value.substring(0, 12);

    const parts = value.match(/.{1,4}/g);
    if (parts) {
      event.target.value = parts.join('-');
    }
  }

  regSubmit(form: NgForm) {

    if (!form.valid) {
      alert("⚠ Please fill all fields correctly before submitting.");
      return;
    }

    this.srv.regsubmit(form.value).subscribe({

      next: (result: any) => {

        alert("🎉 Registration Successful! Welcome to our platform.");

        form.reset();
        this.router.navigate(['/login']);
      },

      error: (err) => {
        alert("❌ Registration Failed! Username or Email may already exist.");
      }

    });

  }

}
