import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: any;
  public errMessage: string = '';

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.initloginForm();
  }

  public initloginForm(): void {
    this.loginForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public saveForm(): void {
    if (this.loginForm.valid) {
      this.loginService.validateLogin(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.status == 200) {
            sessionStorage.setItem('userData', JSON.stringify(response.body));
            if (response.body.userRole == "admin") {
              this.router.navigate(['/admin/dashboard']);
            } else if (response.body.permit) {
              this.router.navigate(['/user/dashboard']);
            } else {
              Swal.fire({
                icon: 'info',
                title: 'Request Pending',
              })
            }
          }
        },
        error: (err) => {
          if (err.status == 404) {
            this.errMessage = 'User Not Exists !';
          } else if (err.status == 401) {
            this.errMessage = 'Incorrect Password !';
          } else {
            this.errMessage = 'Something Went Wrong !';
          }
          setTimeout(() => {
            this.errMessage = '';
          }, 3000);
        },
      });
    }
  }

}
