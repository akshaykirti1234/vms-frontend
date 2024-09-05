import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = `${environment.apiUrl}api/file/photo`

  constructor(private http: HttpClient) { }

  getUserPhoto(filename: string): string {
    return `${this.apiUrl}/${filename}`;
  }
}
