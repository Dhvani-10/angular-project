import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  apiUrl = 'http://localhost:3001';
  eventList: any[] = [];
  showForm = false;
  step = 1;

  participant: any = {
    name: '',
    email: '',
    phone: '',
    event: '',
    source: '',
    session: '',
    agree: false,
    status: 'Pending'
  };

  checkEmail: string = '';
  statusResult: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  // ✅ UPDATED SORTING LOGIC
  loadEvents() {
    this.http.get<any[]>(`${this.apiUrl}/eventsread`).subscribe({
      next: res => {

        const today = new Date();

        this.eventList = res.map(e => {
          e.isExpired = new Date(e.endDate) < today;
          return e;
        })
        .sort((a: any, b: any) => {

          // ✔️ expired नीचे
          if (a.isExpired !== b.isExpired) {
            return a.isExpired ? 1 : -1;
          }

          // ✔️ upcoming events → nearest first
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        });

      },
      error: err => console.error(err)
    });
  }

  openForm(event: any) {
    if (event.isExpired) return;
    this.showForm = true;
    this.step = 1;
    this.participant.event = event.title;
  }

  closeForm() {
    this.showForm = false;
    this.resetParticipant();
  }

  nextStep() { if (this.step < 2) this.step++; }
  prevStep() { if (this.step > 1) this.step--; }

  submitForm() {
    if (!this.participant.agree) {
      alert('⚠ Please agree to the terms & conditions.');
      return;
    }

    if (!this.participant.name || !this.participant.email || !this.participant.phone) {
      alert('⚠ Please fill all required fields.');
      return;
    }

    this.http.post(`${this.apiUrl}/participantsinsert`, this.participant).subscribe({
      next: () => {
        alert('✔ Registration Submitted Successfully!');
        this.closeForm();
      },
      error: err => console.error(err)
    });
  }

  checkStatus() {

    if (!this.checkEmail) {
      alert('⚠ Please enter email');
      return;
    }

    this.http.get<any[]>(`${this.apiUrl}/participantsread`).subscribe({
      next: res => {

        const found = res.find(p => p.email === this.checkEmail);

        if (found) {
          this.statusResult = found;
        } else {
          alert('❌ No registration found');
          this.statusResult = null;
        }

      },
      error: err => console.error(err)
    });
  }

  resetParticipant() {
    this.participant = {
      name: '',
      email: '',
      phone: '',
      event: '',
      source: '',
      session: '',
      agree: false,
      status: 'Pending'
    };
  }

}