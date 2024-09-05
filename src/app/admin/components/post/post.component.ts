import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public userData: any;

  public postForm: any;
  public postDetails: any[] = [];
  public searchFilter: any;
  public errorMessage: string = "";

  constructor(private fb: FormBuilder, private router: Router, private postService: PostService) { }

  ngOnInit(): void {
    this.initPostForm();
    this.loadUserData();
    this.getAllPosts();
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

  initPostForm(): void {
    this.postForm = this.fb.group({
      postId: [''],
      postName: ['', [Validators.required]],
      createdBy: [''],
      updatedBy: ['']
    });
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe({
      next: (response: any) => {
        this.postDetails = response.body;
        console.log(this.postDetails);
      },
      error: (error: any) => {
        this.errorMessage = error.message;
      }
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      if (this.postForm.get("postId")?.value == null) {
        this.postForm.patchValue({
          createdBy: this.userData.userId,
        })
      } else {
        this.postForm.patchValue({
          updatedBy: this.userData.userId,
        })
      }

      this.postService.savePost(this.postForm.value).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: this.postForm.get("postId").value == null ? 'Created Successfully' : 'Updated Successfully'
          })
          this.postForm.reset();
          this.getAllPosts();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
          })
        }
      })
    } else {
      this.errorMessage = "Enter Post Name Before Submiting"
      setTimeout(() => {
        this.errorMessage = "";
      }, 5000);
    }

  }

  public editPost(postId: number): void {
    this.postService.editPost(postId).subscribe({
      next: (response) => {
        this.postForm.patchValue({
          postId: response.postId,
          postName: response.postName
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong!',
        })
      }
    })
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted Successfully'
        });
        this.getAllPosts();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong!',
        });
      }
    })
  }



}
