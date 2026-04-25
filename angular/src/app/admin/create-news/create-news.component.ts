import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-news',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {

  apiUrl = 'http://localhost:3001';

  newsList: any[] = [];

  news: any = {
    title: '',
    category: 'Announcement',
    description: '',
    publishDate: '',
    department: '',
    status: 'Active'
  };

  editMode: boolean = false;
  editId: string = '';
  successMessage: string = '';

  today: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadNews();

    const date = new Date();
    this.today = date.toISOString().split('T')[0];
    this.news.publishDate = this.today;
  }

 loadNews() {
  this.http.get<any[]>(`${this.apiUrl}/newsread`).subscribe({
    next: (res: any[]) => {

      this.newsList = res
        .map(n => ({
          ...n,
          sortDate: new Date(n.publishDate).getTime()
        }))
        .sort((a, b) => b.sortDate - a.sortDate);

    },
    error: (err) => console.error(err)
  });
}

  saveNews() {
    if (this.editMode) {
      this.http.put(`${this.apiUrl}/newsupdate/${this.editId}`, this.news).subscribe({
        next: () => {
          this.successMessage = "✔ News Updated Successfully";
          this.resetForm();
          this.loadNews();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.http.post(`${this.apiUrl}/newsinsert`, this.news).subscribe({
        next: () => {
          this.successMessage = "✔ News Created Successfully";
          this.resetForm();
          this.loadNews();
        },
        error: (err) => console.error(err)
      });
    }

    setTimeout(() => this.successMessage = '', 3000);
  }

  editNews(item: any) {
    this.news = {
      title: item.title,
      category: item.category,
      description: item.description,
      publishDate: item.publishDate,
      department: item.department,
      status: item.status
    };
    this.editMode = true;
    this.editId = item._id;
  }

  deleteNews(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete this news?");
    if (confirmDelete) {
      this.http.delete(`${this.apiUrl}/newsdelete/${id}`).subscribe({
        next: () => {
          this.successMessage = "✔ News Deleted Successfully";
          this.loadNews();
        },
        error: (err) => console.error(err)
      });

      setTimeout(() => this.successMessage = '', 3000);
    }
  }

  resetForm() {
    this.news = {
      title: '',
      category: 'Announcement',
      description: '',
      publishDate: this.today,
      department: '',
      status: 'Active'
    };
    this.editMode = false;
    this.editId = '';
  }

  goDashboard() {
    this.router.navigate(['/admin/home']);
  }
}