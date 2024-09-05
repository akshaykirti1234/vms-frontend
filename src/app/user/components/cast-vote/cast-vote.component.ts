import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CastVoteService } from '../../services/cast-vote.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cast-vote',
  templateUrl: './cast-vote.component.html',
  styleUrls: ['./cast-vote.component.css']
})
export class CastVoteComponent implements OnInit {

  public castVoteForm: any;
  public postList: any;
  public candidateList: any;
  public userData: any;

  constructor(private router: Router, private castVoteService: CastVoteService, private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initCastVoteForm();
    this.getAllPosts();
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


  public initCastVoteForm(): void {
    this.castVoteForm = this.fb.group({
      voteId: [''],
      userId: ['', Validators.required],
      postId: ['', Validators.required],
      candidateId: ['', [Validators.required]]
    })
  }

  public getAllPosts(): void {
    this.castVoteService.getAllPosts().subscribe({
      next: (response) => {
        this.postList = response.body;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public getCandidateByPostId(): void {
    this.candidateList = [];
    this.castVoteForm.get("candidateId").value = '';
    this.castVoteService.getCandidateByPostId(this.castVoteForm.get("postId").value).subscribe({
      next: (response) => {
        this.candidateList = response.body;
        this.cdr.detectChanges(); // Manually trigger change detection

      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public saveVote(): void {

    for (let candidate of this.candidateList) {
      if (candidate.user.userId == this.userData.userId) {
        Swal.fire({
          icon: 'warning',
          title: 'You cannot vote for yourself',
        });
        return;
      }
    }

    this.castVoteForm.patchValue({
      userId: this.userData.userId,
    });

    console.log(this.castVoteForm.value);
    if (this.castVoteForm.valid) {
      this.castVoteService.saveVote(this.castVoteForm.value).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Great!'
          });
          this.castVoteForm.reset();
          this.candidateList = [];
          this.castVoteForm.get("candidateId").value = '';
        },
        error: (error) => {
          if (error.status == 409) {
            Swal.fire({
              icon: 'info',
              title: 'You have already voted for this post.'
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Something went wrong!'
            });
          }
        }
      });
    } else {
      console.log("Invalid");
    }
  }

}
