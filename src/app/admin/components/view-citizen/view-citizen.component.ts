import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { CitizenService } from '../../services/citizen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-citizen',
  templateUrl: './view-citizen.component.html',
  styleUrls: ['./view-citizen.component.css']
})
export class ViewCitizenComponent implements OnInit {

  public citizens: any[] = [];
  public searchQuery: string = '';


  constructor(private fileService: FileService, private citizenService: CitizenService) { }

  ngOnInit(): void {
    this.getAllCitizen();
  }

  public getAllCitizen(): void {
    this.citizenService.getAllCitizen().subscribe({
      next: (response) => {
        this.citizens = response.body;
      },
      error: (error) => {
        this.citizens = [];
      }
    });
  }


  public getUserPhoto(photoPath: string): string {
    return this.fileService.getUserPhoto(photoPath);
  }

  // Getter for filtered citizens
  get filteredCitizens(): any[] {
    if (!this.searchQuery) {
      return this.citizens;
    }
    const query = this.searchQuery.toLowerCase();
    return this.citizens.filter(citizen =>
      citizen.userName.toLowerCase().includes(query) ||
      citizen.userEmail.includes(query)
    );
  }

  public permitCitizen(userId: number): void {
    this.citizenService.permitCitizen(userId).subscribe({
      next: (response) => {
        this.getAllCitizen();
      },
      error: (error) => {
        if (error.status == 404) {
          Swal.fire({
            icon: 'error',
            title: 'User Not Found',
          })
        } else {
          Swal.fire({ icon: 'error', title: 'Internal Server error' });
        }
      }
    });
  }


}
