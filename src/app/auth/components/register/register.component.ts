import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm: any;
  public file: any;
  public fileName: string = '';
  imagePreview: string | ArrayBuffer | null = null;


  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit(): void {
    this.initregisterForm();
  }

  public initregisterForm(): void {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      userPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      userEmail: ['', [Validators.required, Validators.email]],
    });
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.file);
    }
  }

  public submitForm(): void {
    if (this.registerForm.valid) {
      if (this.file == null) {
        Swal.fire({
          icon: 'info',
          title: 'Upload Your Photo',
        })
        return;
      }
      const formData = new FormData();
      // Append form fields to FormData
      formData.append('userName', this.registerForm.get('userName')?.value);
      formData.append('userPhone', this.registerForm.get('userPhone')?.value);
      formData.append('userEmail', this.registerForm.get('userEmail')?.value);
      //Append the file in FormData
      if (this.file) {
        formData.append('file', this.file);
      }

      this.loginService.saveRegisterForm(formData).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Registration Success',
          })
          this.registerForm.reset();
          this.file = null;
          this.imagePreview = null;
        },
        error: (eror) => {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed! Try agian later',
          })
        }
      });
    } else {
      Swal.fire({
        title: 'Please fill the form correctly',
        icon: 'error'
      })
    }
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

}
