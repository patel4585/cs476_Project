import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../../../models/user';
import { ManageUsersService } from '../../../services/manage-users.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [ NgFor, NgIf ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  isAdmin: boolean = false;

  constructor(private manageUsers: ManageUsersService, private auth: AuthService) {}

  ngOnInit(): void {
    this.manageUsers.getAllUsers().subscribe((data) => {
      this.users = data;
    });

    this.isAdmin = this.auth.isAdmin();
  }

  deleteUser(userId:string): void {
    this.manageUsers.deleteUser(userId).subscribe({
      next: () => {
        this.manageUsers.getAllUsers().subscribe((data) => {
          this.users = data;
        });
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      }
    });
  }
}
