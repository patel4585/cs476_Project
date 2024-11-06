import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ NgIf, FormsModule ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  private linkElement: HTMLLinkElement | null = null;
  error_message_hidden: boolean = true;
  error_message: string = "";
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.linkElement = document.createElement('link');

    this.linkElement.rel = 'stylesheet';
    this.linkElement.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css';
    document.head.appendChild(this.linkElement);

    document.title = 'Signup Page';
    document.body.classList.add('signup-page-body');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('signup-page-body');
    if (this.linkElement){
      document.head.removeChild(this.linkElement);
      this.linkElement = null;
    }
    
    document.title = 'front-end';
  }

  onSubmit(): void {
    let user: User = {
      _id: "123", // temporary value
      first_name: this.firstName, 
      last_name: this.lastName,
      email: this.email,
      role: "Normal User",
      password: this.password
    }

    this.authService.signUp(user).subscribe({
      next: (response) => {
        if (response.success)
          this.router.navigate(['/home']);
        else 
          console.log("SignUp Filed");
      },
      error: (error) => {
        console.log('An error occurred', error.message);
      }
    });
  }
}