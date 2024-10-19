import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";


@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
