import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = `${environment.apiUrl}api/post/`

  constructor(private http: HttpClient) { }

  public getAllPosts(): Observable<any> {
    return this.http.get(this.apiUrl + "getAllPosts", { observe: 'response' });
  }

  public savePost(postForm: any): Observable<any> {
    return this.http.post(this.apiUrl + "savePost", postForm, { observe: 'response' });
  }

  public editPost(postId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}editPost/${postId}`, { observe: 'response' });
  }

  public deletePost(postId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}deletePost/${postId}`, { observe: 'response' });
  }
}
