import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-news.component.html',
  styleUrls: ['./public-news.component.css']
})
export class PublicNewsComponent implements OnInit {

  newsList: any[] = [];
  apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews() {
    this.http.get<any[]>(`${this.apiUrl}/newsread`).subscribe({
      next: (res) => {

        const activeNews = res.filter((n: any) => n.status === 'Active');

        this.newsList = activeNews.sort((a: any, b: any) => {
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        });

      },
      error: (err) => console.error(err)
    });
  }
}