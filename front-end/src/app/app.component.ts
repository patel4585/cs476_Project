import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/pages/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
  
  // boolean to capture if sidebar needs to be shown
  showSidebar: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // check current route
    this.router.events.subscribe(() => {
      // set where the side bar needs to shown
      const currentRoute = this.router.url;
      this.showSidebar = ['/', '/home', '/create.post', '/posts', '/profile', '/users'].includes(currentRoute);
    });
  }
}