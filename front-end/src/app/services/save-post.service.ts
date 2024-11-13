import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SavePostService {
  private apiUrl = "http://localhost:3000/api/savePost";

  constructor(private http: HttpClient) { }

  savePost(post: Post): Observable<any> {
    return this.http.post<any>(this.apiUrl, { post }).pipe(
      tap(response => {
        console.log("here");
        if (!response.success) {
          console.log(response.message);
        }
      }),
      catchError(error => {
        console.error('Error occurred:', error);
        return of(null); 
      })
    )
  }
}
