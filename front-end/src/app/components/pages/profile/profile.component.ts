import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { User } from '../../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [ NgIf, FormsModule ]
})
export class ProfileComponent implements OnInit {
  isLogged: boolean | null = null;
  firstName: string = "";
  lastName: string = "";
  _id: string = "";
  updateBool: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLogged = this.auth.isLoggedIn();

    const userData = localStorage.getItem('user');
    if(userData){
      const user:User = JSON.parse(userData);

      this.firstName = user.first_name;
      this.lastName = user.last_name;
      this._id = user._id;
    }
  }

  onUpdateProfile() {
    this.auth.updateProfile(this.firstName, this.lastName, this._id).subscribe({
      next: (Response) => {
        this.firstName = Response.user.first_name;
        this.lastName = Response.user.last_name;
        this.updateBool = true;
        console.log("User Updated", Response.user);
      }
    })
  }
}
