import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {
  private apiUrl_1 = "http://localhost:3000/api/getAllUsers";
  private apiUrl_2 = "http://localhost:3000/api/deleteUser";

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl_1);
  }

  deleteUser(userId:string): Observable<any> {
    return this.http.post<any>(this.apiUrl_2, { userId });
  }
}
