import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { FormsModule } from '@angular/forms';
import { Post } from '../../../models/post';
import { SavePostService } from '../../../services/save-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetPostsService } from '../../../services/get-posts.service';

@Component({
  selector: 'create.post',
  standalone: true,
  imports: [ NgIf, FormsModule ],
  templateUrl: './create.post.component.html',
  styleUrl: './create.post.component.css',
  providers: []
})

export class CreatePostComponent implements OnInit {
  isLogged: boolean | null = null;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  amount_willing_to_pay: number = 0;
  selectedCurrency1: string = "";
  desired_amount_in_return: number = 0;
  selectedCurrency2: string = "";
  userID: string = "";
  addionalDetails: string = "";
  isEditMode: boolean = false;
  postId: string = "PlaceHolder";

  constructor(private auth: AuthService, private savePost: SavePostService, private router: Router, private route: ActivatedRoute, private getPosts: GetPostsService) {
    this.route.params.subscribe(params => {
      if(params['_id']){
        this.isEditMode = true;
        this.postId = params['_id'];
      }
    });
  }

  ngOnInit(): void {
    this.isLogged = this.auth.isLoggedIn();

    if(this.isLogged) {
      const userData = localStorage.getItem('user');

      if(userData){
        const user:User = JSON.parse(userData);

        this.firstName = user.first_name;
        this.lastName = user.last_name;
        this.email = user.email;
        this.userID = user._id;
      }

      if(this.isEditMode) {
        this.getPosts.getPost(this.postId).subscribe((data) => {
          this.amount_willing_to_pay = data.post.amount_willing_to_pay;
          this.selectedCurrency1 = data.post.amount_willing_to_pay_currency;
          this.desired_amount_in_return = data.post.desired_amount_in_return;
          this.selectedCurrency2 = data.post.desired_amount_in_return_currency;
          this.addionalDetails = data.post.additional_details;
        })
      }
    }
  }

  submit():void {
    let userData = localStorage.getItem('user');

    if(userData){
      let post: Post = { 
        _id: this.postId,
        user: JSON.parse(userData),
        amount_willing_to_pay: this.amount_willing_to_pay, 
        amount_willing_to_pay_currency: this.selectedCurrency1,
        desired_amount_in_return: this.desired_amount_in_return,
        desired_amount_in_return_currency: this.selectedCurrency2,
        additional_details: this.addionalDetails
      }

      this.savePost.savePost(post).subscribe({
        next: () => {
          // Navigate to '/posts' only after the save is successful
          this.router.navigate(['/posts']);
        },
        error: (err) => {
          console.error("Error saving post:", err);
        }
    });
    }
  }
}