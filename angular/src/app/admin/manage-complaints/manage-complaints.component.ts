import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-complaints',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-complaints.component.html',
  styleUrls: ['./manage-complaints.component.css']
})
export class ManageComplaintsComponent {

  data: any = [];

  constructor(private srv: ApiService, private router: Router) {
    this.getComplaints();
  }

  getComplaints() {
    this.srv.getComplaints().subscribe(
      (dt: any) => {
        this.data = dt;
      },
      (err) => {
        console.error("Error fetching complaints", err);
      }
    );
  }

  approve(id: any) {
    this.srv.updateComplaintStatus(id, "Approved").subscribe(
      () => {
        alert("Complaint Approved");
        this.getComplaints();
      },
      (err) => {
        alert("Error approving complaint");
        console.error(err);
      }
    );
  }

  reject(id: any) {
    this.srv.updateComplaintStatus(id, "Rejected").subscribe(
      () => {
        alert("Complaint Rejected");
        this.getComplaints(); 
      },
      (err) => {
        alert("Error rejecting complaint");
        console.error(err);
      }
    );
  }

  goToDashboard() {
    this.router.navigate(['/admin/home']);
  }

}