import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:3000/api/login';
  private signUpUrl = 'http://localhost:3000/api/signUp';
  private profileUrl = 'http://localhost:3000/api/profileUpdate';

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {}

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

    if(['/create.post', '/profile', '/users'].includes(this.router.url))
      this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    // Check if user is logged in
    return !!localStorage.getItem('user');
  }

  signUp(user: User) {
    return this.http.post<any>(this.signUpUrl, { user });
  }

  isAdmin(): boolean {
    const userData = localStorage.getItem('user');

    if(userData){
      const user:User = JSON.parse(userData);

      return (user.role == 'Admin User');
    }

    return false;
  }

  updateProfile(firstName: string, lastName: string, _id: string): Observable<any> {
    return this.http.post<any>(this.profileUrl, { firstName, lastName, _id }).pipe(
      tap(response => {
        if (response.success) {
          const userData = localStorage.getItem('user');

          if(userData) {
            const user:User = JSON.parse(userData);

            user.first_name = response.user.first_name;
            user.last_name = response.user.last_name;

            localStorage.setItem('user', JSON.stringify(user));
          }
        }
      })
    );
  }
}