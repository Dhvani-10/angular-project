import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-participants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-participants.component.html',
  styleUrls: ['./view-participants.component.css']
})
export class ViewParticipantsComponent implements OnInit {

  apiUrl = 'http://localhost:3001';
  participants: any[] = [];
  searchText: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadParticipants();
  }

  loadParticipants() {
    this.http.get<any[]>(`${this.apiUrl}/participantsread`).subscribe({
      next: res => this.participants = res,
      error: err => console.error(err)
    });
  }

  approve(p: any) {
    if(p.status==='Approved') return;
    this.http.put(`${this.apiUrl}/participantsupdate/${p._id}`, { status: 'Approved' }).subscribe({
      next: () => this.loadParticipants(),
      error: err => console.error(err)
    });
  }

  reject(p: any) {
    if(p.status==='Rejected') return;
    this.http.put(`${this.apiUrl}/participantsupdate/${p._id}`, { status: 'Rejected' }).subscribe({
      next: () => this.loadParticipants(),
      error: err => console.error(err)
    });
  }

  goBack() {
    this.router.navigate(['/admin/events']);
  }
}