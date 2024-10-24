import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
    document.title = 'Signup Page';
    document.body.classList.add('signup-page-body');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('signup-page-body');
    document.title = 'front-end';
  }

}
