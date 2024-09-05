import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public userData: any;

  constructor(private router: Router, private fileService: FileService) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    // Retrieve user data from sessionStorage
    const userDataString = sessionStorage.getItem('userData');

    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  public getFirstName(fullName: string): string {
    return fullName ? fullName.split(' ')[0] : 'User';
  }

  public logout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear user data from sessionStorage
        sessionStorage.removeItem('userData');
        this.router.navigate(['/home']);
      }
    });
  }

  public getuserPhoto(photoPath: string): string {
    return this.fileService.getUserPhoto(photoPath);
  }
}
