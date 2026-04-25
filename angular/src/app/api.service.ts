import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'http://localhost:3001'; 

  constructor(private http: HttpClient) {
    console.log("API Service Constructor Called..");
  }

  getdata(): Observable<any> {
    return this.http.get(this.url + "/empread");
  }

  regsubmit(data: any): Observable<any> {
    return this.http.post(this.url + '/reginsert', data);
  }

  getregdata(): Observable<any> {
    return this.http.get(this.url + "/regread");
  }

  getlogdata(username: string): Observable<any> {
    return this.http.get(this.url + "/logdata?username=" + username);
  }

  regdelete(id: any): Observable<any> {
    return this.http.delete(this.url + '/regdelete/' + id);
  }

  regupdate(id: any, data: any): Observable<any> {
    return this.http.put(this.url + '/regupdate/' + id, data);
  }


  complaintSubmit(data:any): Observable<any> {
    return this.http.post(this.url + '/complaintinsert', data);
  }

  getComplaints(): Observable<any> {
    return this.http.get(this.url + '/complaintread');
  }

  updateComplaintStatus(id:any, status:any): Observable<any> {
    return this.http.put(this.url + '/complaintupdate/' + id, { status });
  }


  getAllRegisteredUsers(): Observable<any> {
    return this.http.get(this.url + '/regread'); 
  }

}
