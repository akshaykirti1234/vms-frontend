import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = `${environment.apiUrl}api/login/`

  constructor(private http: HttpClient) { }

  public validateLogin(loginForm: any): Observable<any> {
    return this.http.post(this.apiUrl + "validateLogin", loginForm, { observe: 'response' });
  }

  public saveRegisterForm(formData: FormData): Observable<any> {
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    return this.http.post(this.apiUrl + "saveRegisterForm", formData, { observe: 'response' });
  }

}
