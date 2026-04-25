import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';   

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule, RouterModule],       
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent {

  type: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type') || '';
  }
}
