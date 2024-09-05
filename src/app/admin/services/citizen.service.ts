import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitizenService {

  private apiUrl = `${environment.apiUrl}api/user/`

  constructor(private http: HttpClient) { }

  public getAllCitizen(): Observable<any> {
    return this.http.get(this.apiUrl + "getAllCitizen", { observe: 'response' });
  }

  public permitCitizen(userId: number) {
    return this.http.put(`${this.apiUrl}permitCitizen/${userId}`, { observe: 'response' });

  }

}
