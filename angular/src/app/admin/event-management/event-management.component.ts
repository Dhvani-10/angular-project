import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent implements OnInit {

  apiUrl = 'http://localhost:3001';

  eventList: any[] = [];

  event: any = {
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    time: '',
    organizer: '',
    description: ''
  };

  message: string = '';
  editMode: boolean = false;
  editId: string = '';

  today: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEvents();

    const date = new Date();
    this.today = date.toISOString().split('T')[0];
  }

  validateEvent(): boolean {
    if (
      !this.event.title?.trim() ||
      !this.event.location?.trim() ||
      !this.event.startDate ||
      !this.event.endDate ||
      !this.event.time ||
      !this.event.organizer?.trim() ||
      !this.event.description?.trim()
    ) {
      this.message = '❌ All fields are required!';
      setTimeout(() => this.message = '', 3000);
      return false;
    }
    return true;
  }

  // ✅ UPDATED SORTING LOGIC HERE
  loadEvents() {
    this.http.get<any[]>(`${this.apiUrl}/eventsread`).subscribe({
      next: (res) => {

        const today = new Date();

        this.eventList = res.sort((a: any, b: any) => {

          const aEnd = new Date(a.endDate);
          const bEnd = new Date(b.endDate);

          const aExpired = aEnd < today;
          const bExpired = bEnd < today;

          // ✔️ पहले active events
          if (aExpired !== bExpired) {
            return aExpired ? 1 : -1;
          }

          // ✔️ active events → nearest date first
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();

        });

      },
      error: (err) => console.error(err)
    });
  }

  createEvent() {

    if (!this.validateEvent()) return;

    if (this.editMode) {
      this.http.put(`${this.apiUrl}/eventsupdate/${this.editId}`, this.event).subscribe({
        next: () => {
          this.message = '✔ Event Updated Successfully';
          this.resetForm();
          this.loadEvents();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.http.post(`${this.apiUrl}/eventsinsert`, this.event).subscribe({
        next: () => {
          this.message = '✔ Event Created Successfully';
          this.resetForm();
          this.loadEvents();
        },
        error: (err) => console.error(err)
      });
    }

    setTimeout(() => this.message = '', 3000);
  }

  editEvent(e: any) {
    this.event = {
      title: e.title,
      location: e.location,
      startDate: e.startDate,
      endDate: e.endDate,
      time: e.time,
      organizer: e.organizer,
      description: e.description
    };

    this.editMode = true;
    this.editId = e._id;
  }

  deleteEvent(id: string) {
    if (confirm("Are you sure you want to delete this event?")) {
      this.http.delete(`${this.apiUrl}/eventsdelete/${id}`).subscribe({
        next: () => {
          this.message = '✔ Event Deleted Successfully';
          this.loadEvents();
        },
        error: (err) => console.error(err)
      });

      setTimeout(() => this.message = '', 3000);
    }
  }

  resetForm() {
    this.event = {
      title: '',
      location: '',
      startDate: '',
      endDate: '',
      time: '',
      organizer: '',
      description: ''
    };

    this.editMode = false;
    this.editId = '';
  }

  goDashboard() {
    this.router.navigate(['/admin/home']);
  }

  viewParticipants() {
    this.router.navigate(['/admin/view-participants']);
  }

  formatTime(time24: string): string {
    if (!time24) return '';

    const [hourStr, minute] = time24.split(':');
    let hour = parseInt(hourStr, 10);

    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;

    return `${hour}:${minute} ${ampm}`;
  }
}