import { Component, OnInit } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { GetPostsService } from '../../../services/get-posts.service';
import { Post } from '../../../models/post';
import { User } from '../../../models/user';

@Component({
  selector: 'posts',
  standalone: true,
  imports: [NgFor, DatePipe, NgIf],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  user: User | null = null;

  constructor(private getPosts: GetPostsService) {}

  ngOnInit(): void {
    this.getPosts.getAllPosts().subscribe((data) => {
      this.posts = data;
    });

    const userData = localStorage.getItem('user');
    if(userData)
      this.user = JSON.parse(userData);
  }

  delete(postId: string) {
    this.getPosts.deletePost(postId).subscribe({
      next: (Response) => {
        console.log("Post Deleted", Response);
        this.posts = this.posts.filter(post => post._id !== postId);
      }
    });
  }
}
