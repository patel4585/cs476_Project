import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from "@angular/router";
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [ 
    NgIf,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  loggedIn: boolean | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loggedIn = this.auth.isLoggedIn();
  }

  signOut(): void {
    if(this.loggedIn) {
      this.auth.logout();
      this.loggedIn = false;

      if(this.router.url == '/create.post')
        this.router.navigate(['/home']);
    }
  }
}