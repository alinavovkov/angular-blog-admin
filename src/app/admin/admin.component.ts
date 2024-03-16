import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../services/post.service';
import { IPost } from '../interfaces/posts.interface';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  public adminPosts: IPost[] = [];
  public titleInput: string = '';
  public textInput: string = '';
  public authorInput: string = '';
  public errorTxt!: string;
  public clickerSave = false;
  public editID!: number;


  private post: Array<IPost> = [
    {
      id: 1,
      title: "hello",
      text: "this is my first post",
      author: "Alina"
    }
  ];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getAll().subscribe(data => {
      this.adminPosts = data;
      console.log(data);
    })
  }

  addPost(): void {
    if (!this.titleInput || !this.textInput) {
      this.errorTxt = 'Please fill in all required fields';
      return;
    }
    const index = this.adminPosts.length;
    const newPost: IPost = {
      id: index + 1,
      title: this.titleInput,
      text: this.textInput,
      author: this.authorInput
    };
    this.postService.create(newPost).subscribe(() => {
      this.getPosts();
      this.resetFormAndToggleTemplate();
    })
  }

  editPost(post: IPost) {
    this.titleInput = post.title;
    this.textInput = post.text;
    this.authorInput = post.author;
    this.clickerSave = true;
    this.editID = post.id;
  }

  savePost(){
    const updatePost = {
      id: this.editID,
      title: this.titleInput,
      text: this.textInput,
      author: this.authorInput
    };
    this.postService.update(updatePost, this.editID).subscribe(() => {
      this.getPosts();
      this.resetFormAndToggleTemplate();
    })
  }
  deletePost(post: IPost): void {
    const index = this.adminPosts.indexOf(post);
    if (index !== -1) {
      this.postService.delete(post.id).subscribe(() => {
        this.getPosts();
        this.resetFormAndToggleTemplate();
      })
    }
  }

  private resetFormAndToggleTemplate() {
    this.titleInput = '';
    this.textInput = '';
    this.authorInput = '';
    this.clickerSave = false;
  }
}
