import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {LoginComponent} from "./components/pages/login/login.component";
import {SidebarComponent} from "./components/pages/sidebar/sidebar.component";
import { SignupComponent } from './components/pages/signup/signup.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, LoginComponent, SidebarComponent, SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
}
