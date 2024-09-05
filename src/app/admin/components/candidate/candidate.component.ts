import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CandidateService } from '../../services/candidate.service';
import { CitizenService } from '../../services/citizen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {


  public errorMessage: any;
  public candidateForm: any;
  public candidateDetails: any;
  public userList: any;
  public postList: any;

  constructor(private fb: FormBuilder, private router: Router, private candidateService: CandidateService, private postService: PostService, private userSrevice: CitizenService) { }

  public ngOnInit(): void {
    this.initCandidateForm();
    this.getAllPosts();
    this.getAllUsers();
    this.getAllCandidates();
  }


  public initCandidateForm(): void {
    this.candidateForm = this.fb.group({
      candidateId: [''],
      postId: ['', Validators.required],
      userId: ['', Validators.required],
      createdBy: [''],
      updatedBy: ['']
    });
  }

  public getAllPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (response) => {
        this.postList = response.body;
      },
      error: (error) => {
        this.postList = [];
      }
    });
  }

  public getAllUsers(): void {
    this.userSrevice.getAllCitizen().subscribe({
      next: (response) => {
        this.userList = response.body;
      },
      error: (error) => {
        this.userList = [];
      }
    });
  }

  public getAllCandidates(): void {
    this.candidateService.getAllCandidates().subscribe({
      next: (response) => {
        this.candidateDetails = response.body;
      },
      error: (error) => {
        console.log(error);
        this.candidateDetails = [];
      }
    });
  }

  public onSubmit() {
    if (this.candidateForm.valid) {
      this.candidateService.createCandidate(this.candidateForm.value).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Candidate Created Successfully',
          });
          this.candidateForm.reset();
          this.getAllCandidates();
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else {
      this.errorMessage = "Please Fill the Form Correctly"
      setTimeout(() => {
        this.errorMessage = "";
      }, 3000);
    }
  }

  public deleteCandidate(candidateId: any) {
    this.candidateService.deleteCandidate(candidateId).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Candidate Deleted Successfully',
        });
        this.getAllCandidates();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public editCandidate(candidateId: any) {
    this.candidateService.getCandidateById(candidateId).subscribe({
      next: (response) => {
        this.candidateForm.patchValue({
          candidateId: response.candidateId,
          postId: response.post.postId,
          userId: response.user.userId
        });
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    })

  }
}
