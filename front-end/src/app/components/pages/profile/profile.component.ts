import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor() {}

  onUpdateProfile(firstName: string, lastName: string, email: string, newPassword: string, confirmNewPassword: string) {
    if (newPassword && newPassword !== confirmNewPassword) {
      alert('New password and confirmation do not match.');
      return;
    }
    // need to add backend here to update data -- @Devpatel
    console.log('Updated profile details:', { firstName, lastName, email });
    alert('Profile updated successfully!');
  }
}
