import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-complaint',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent {

  complaint = {
    name: '',
    email: '',
    subject: '',
    message: '',
    area: ''
  };

  registeredUsers: any[] = [];

  complaintStatus: any = null;

  trackEmail: string = '';
  trackArea: string = '';

  constructor(private api: ApiService) {
    this.loadRegisteredUsers();
  }

  loadRegisteredUsers() {
    this.api.getAllRegisteredUsers().subscribe(
      (res: any) => {
        this.registeredUsers = res.map((user: any) => ({
          name: user.fullname.trim().toLowerCase(),
          email: user.email.trim().toLowerCase()
        }));
      },
      (err: any) => {
        console.error('Error fetching registered users', err);
      }
    );
  }

  submitComplaint() {
    if (!this.complaint.message || !this.complaint.area || !this.complaint.email || !this.complaint.name) {
      alert('⚠ Please fill all required fields!');
      return;
    }

    const enteredName = this.complaint.name.trim().toLowerCase();
    const enteredEmail = this.complaint.email.trim().toLowerCase();

    const matchedUser = this.registeredUsers.find(
      user => user.name === enteredName && user.email === enteredEmail
    );

    if (!matchedUser) {
      alert('⚠ Name and Email do not match any registered user.');
      return;
    }

    this.api.complaintSubmit(this.complaint).subscribe(
      (res: any) => {
        alert('✅ Complaint submitted successfully!');
        this.complaint = { name: '', email: '', subject: '', message: '', area: '' };
      },
      (err: any) => {
        alert('❌ Error submitting complaint.');
        console.error(err);
      }
    );
  }

  trackComplaint() {

    if (!this.trackEmail || !this.trackArea) {
      alert('⚠ Enter Email and Area');
      return;
    }

    this.api.getComplaints().subscribe(
      (res: any[]) => {

        const found = res.find(c =>
          c.email.toLowerCase() === this.trackEmail.toLowerCase() &&
          c.area.toLowerCase() === this.trackArea.toLowerCase()
        );

        if (found) {
          this.complaintStatus = found;
        } else {
          alert('❌ No complaint found');
          this.complaintStatus = null;
        }

      },
      (err: any) => {
        console.error(err);
      }
    );
  }
}
