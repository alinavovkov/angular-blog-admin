import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../interfaces/posts.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private api = { post: `http://localhost:3000/posts`}

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.api.post);
  }

  create(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(this.api.post, post);
  }

  update(post: IPost, id: number): Observable<IPost> {
    return this.http.patch<IPost>(`${this.api.post}/${id}`, post);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.post}/${id}`);
  }

  updatePostIDs(deletedIndex: number): Observable<void> {
    return this.http.patch<void>(`${this.api}/updateIDs`, { deletedIndex });
  }

}
