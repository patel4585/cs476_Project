import { Component, OnInit } from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';
import { GetPostsService } from '../../../services/get-posts.service';
import { Post } from '../../../models/post';

@Component({
  selector: 'posts',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private getPosts: GetPostsService) {}

  ngOnInit(): void {
    this.getPosts.getAllPosts().subscribe((data) => {
      this.posts = data;
    });
  }
}
