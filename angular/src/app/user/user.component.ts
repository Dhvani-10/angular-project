import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [NgFor, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  data:any;
  editdata:any = {};   // update form ke liye

  constructor(private srv:ApiService)
  {
    this.getdata();
  }

  // READ
  getdata()
  {
    this.srv.getregdata().subscribe((dt:any)=>{
      this.data = dt;
    });
  }

  // DELETE
  rowdelete(id:any)
  {
    if(confirm("Are you sure?"))
    {
      this.srv.regdelete(id).subscribe(()=>{
        alert("Record Deleted");
        this.getdata();
      });
    }
  }

 // UPDATE BUTTON CLICK
rowupdate(row:any)
{
  this.editdata = {...row};   // yahi sabse important line
  console.log("Edit Data:", this.editdata);
}

updateSubmit()
{
  const id = this.editdata._id;

  // 🔥 _id REMOVE
  const updatedData = { ...this.editdata };
  delete updatedData._id;

  this.srv.regupdate(id, updatedData).subscribe(()=>{
    alert("Record Updated Successfully");
    this.getdata();
    this.editdata = {};   // form reset
  });
}


}
