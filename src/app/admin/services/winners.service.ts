import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WinnersService {

  private apiUrl = `${environment.apiUrl}api/winner/`


  constructor(private http: HttpClient) { }

  public getWinners(): Observable<any> {
    return this.http.get(`${this.apiUrl}getWinners`, { observe: 'response' });
  }
}
