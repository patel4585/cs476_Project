import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [ NgIf ]
})
export class ProfileComponent implements OnInit {
  isLogged: boolean | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLogged = this.auth.isLoggedIn();
  }

  onUpdateProfile(firstName: string, lastName: string) {
    // need to add backend here to update data -- @Devpatel
    console.log('Updated profile details:', { firstName, lastName });
    alert('Profile updated successfully!');
  }
}
