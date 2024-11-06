import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:3000/api/login';
  private signUpUrl = 'http://localhost:3000/api/signUp';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password }).pipe(
      tap(response => {
        if (response.success) {
          // Store user info in local storage
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      })
    );
  }

  logout() {
    // Remove user info and token from storage
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    // Check if user is logged in
    return !!localStorage.getItem('user');
  }

  signUp(user: User) {
    return this.http.post<any>(this.signUpUrl, { user });
  }
}