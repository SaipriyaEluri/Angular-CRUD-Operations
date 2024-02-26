import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  private apiUrl = "http://localhost:3000"

  getTaskList() : Observable<any>{
    return this.http.get(`${this.apiUrl}/taskList`);
  }
  getTaskListById(id:any) : Observable<any>{
    return this.http.get(`${this.apiUrl}/taskList/${id}`);
  }
  
  saveTaskList(payload:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/taskList`, payload)
  }

  deleteTaskList(id:any){
    return this.http.delete(`${this.apiUrl}/taskList/${id}`)
  }
  updateTaskList(id:any, data:any){
    return this.http.put(`${this.apiUrl}/taskList/${id}`, data)
  }
}

