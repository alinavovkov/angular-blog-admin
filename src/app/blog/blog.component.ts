import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { IPost } from '../interfaces/posts.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  public postBlog: Array<IPost> = [];

  constructor(
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getAll().subscribe(data => {
      this.postBlog = data;
    })
  }
}
