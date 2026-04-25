import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { NgFor, NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent {

  data: any;

  constructor(private srv: ApiService, private router: Router) {
    this.getdata();
  }

  getdata() {
    this.srv.getregdata().subscribe((dt: any) => {
      this.data = dt;
    });
  }

  rowdelete(id: any) {
    if (confirm("Are you sure?")) {
      this.srv.regdelete(id).subscribe(() => {
        alert("Record Deleted");
        this.getdata();
      });
    }
  }

  toggleBlock(user: any) {
    const newStatus = user.status === 'blocked' ? 'active' : 'blocked';

    this.srv.regupdate(user._id, { status: newStatus }).subscribe(() => {
      alert(`User ${newStatus === 'blocked' ? 'Blocked' : 'Unblocked'} Successfully`);
      this.getdata();
    });
  }

  goToDashboard() {
    this.router.navigate(['/admin/home']);
  }

}