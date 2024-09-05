import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CastVoteService {

  private apiUrl = environment.apiUrl


  // private apiUrl = "http://localhost:8085/api/cast-vote/"

  constructor(private http: HttpClient) { }

  public getAllPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}api/post/getAllPosts`, { observe: 'response' });
  }

  public getCandidateByPostId(postId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}api/vote/getCandidateByPostId/${postId}`, { observe: 'response' });
  }

  public saveVote(castVoteForm: any): Observable<any> {
    return this.http.post(`${this.apiUrl}api/vote/saveVote`, castVoteForm, { observe: 'response' });
  }


}
