import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private apiUrl = `${environment.apiUrl}api/candidate/`

  constructor(private http: HttpClient) { }

  public getAllCandidates(): Observable<any> {
    return this.http.get(this.apiUrl + "getAllCandidates", { observe: 'response' });
  }
  public getCandidateById(candidateId: number): Observable<any> {
    return this.http.put(this.apiUrl + `getCandidateById/${candidateId}`, { observe: 'response' });
  }
  public createCandidate(candidateForm: any): Observable<any> {
    return this.http.post(this.apiUrl + "createCandidate", candidateForm, { observe: 'response' });
  }
  public deleteCandidate(candidateId: number): Observable<any> {
    return this.http.delete(this.apiUrl + `deleteCandidate/${candidateId}`, { observe: 'response' });
  }
}
