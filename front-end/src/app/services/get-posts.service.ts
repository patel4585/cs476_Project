import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetPostsService {
  private apiUrl_1 = "http://localhost:3000/api/allPosts";
  private apiUrl_2 = "http://localhost:3000/api/deletePost";

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl_1);
  }

  deletePost(postId: string): Observable<any> {
    return this.http.post<any>(this.apiUrl_2, { postId });
  }
}