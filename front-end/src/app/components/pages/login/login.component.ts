import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  private linkElement: HTMLLinkElement | null = null;

  ngOnInit(): void {
    this.linkElement = document.createElement('link');

    this.linkElement.rel = 'stylesheet';
    this.linkElement.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css';
    document.head.appendChild(this.linkElement);

    document.body.classList.add('login-page-body');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('login-page-body');
    if (this.linkElement){
      document.head.removeChild(this.linkElement);
      this.linkElement = null;
    }
  }
}
