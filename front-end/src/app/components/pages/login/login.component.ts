import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, RouterLink, NgIf ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  private linkElement: HTMLLinkElement | null = null;
  email: string = "";
  password: string = "";
  error_message_hidden: boolean = true;
  error_message: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.linkElement = document.createElement('link');

    this.linkElement.rel = 'stylesheet';
    this.linkElement.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css';
    document.head.appendChild(this.linkElement);

    document.title = 'Login Page';
    document.body.classList.add('login-page-body');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('login-page-body');
    if (this.linkElement){
      document.head.removeChild(this.linkElement);
      this.linkElement = null;
    }

    document.title = 'front-end';
  }

  onLogin(): void {
    
    if (!this.email || !this.password) {
      this.error_message_hidden = false;
      this.error_message = "Please fill out all required fields.";
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if(response.success) {
          console.log("Login Successful", response.user);
          this.router.navigate(['/home']);
        } else {
          this.error_message_hidden = false;
          this.error_message = "Invalid email or password";

        }
      },
      error: (error) => {
        this.error_message_hidden = false;
        this.error_message = "Invalid email or password";
        console.log("An error occurred during logging in - " + error.message);
      }
    })
  }
}